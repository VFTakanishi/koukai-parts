(function () {
  const config = window.APP_CONFIG || {};
  const hasSupabaseConfig = Boolean(config.SUPABASE_URL && config.SUPABASE_PUBLISHABLE_KEY);
  const client = hasSupabaseConfig && window.supabase
    ? window.supabase.createClient(config.SUPABASE_URL, config.SUPABASE_PUBLISHABLE_KEY, {
        auth: { persistSession: true, autoRefreshToken: true }
      })
    : null;

  function requireClient() {
    if (!client) {
      throw new Error("Supabase is not configured.");
    }
  }

  async function fetchPublicAliases() {
    requireClient();
    const { data, error } = await client
      .from("classification_aliases")
      .select("alias_kind,alias_text,alias_normalized,canonical_value");
    if (error) {
      throw error;
    }
    return data || [];
  }

  async function insertRegret(payload) {
    requireClient();
    const normalizedPayload = {
      product_text: payload.product_text,
      disappointment_text: payload.disappointment_text,
      manufacturer_name: payload.manufacturer_name || "未分類",
      part_category: window.TuningClassifier.toDbPartCategory(payload.part_category),
      complaint_category: window.TuningClassifier.toDbComplaintCategory(payload.complaint_category),
      visitor_id: payload.visitor_id,
      product_normalized: payload.product_normalized,
      disappointment_normalized: payload.disappointment_normalized,
      classification_status: "unreviewed",
      is_excluded: false
    };

    const { error } = await client.from("tuning_part_regrets").insert(normalizedPayload);
    if (error && error.code === "23505") {
      return { duplicate: true };
    }
    if (error) {
      throw error;
    }
    return { duplicate: false };
  }

  async function signIn(email, password) {
    requireClient();
    const result = await client.auth.signInWithPassword({ email, password });
    if (result.error) {
      throw result.error;
    }
    return result.data;
  }

  async function signOut() {
    if (!client) return;
    const { error } = await client.auth.signOut();
    if (error) throw error;
  }

  async function getSession() {
    if (!client) return null;
    const result = await client.auth.getSession();
    return result.data.session;
  }

  async function updatePassword(password) {
    requireClient();
    const { data, error } = await client.auth.updateUser({ password });
    if (error) throw error;
    return data;
  }

  function onAuthStateChange(callback) {
    requireClient();
    return client.auth.onAuthStateChange(callback);
  }

  function applyAdminFilters(query, options) {
    if (options.search) {
      const search = options.search.replace(/[%_,.()]/g, " ").trim();
      if (search) {
        query = query.or([
          `product_text.ilike.%${search}%`,
          `disappointment_text.ilike.%${search}%`,
          `manufacturer_name.ilike.%${search}%`
        ].join(","));
      }
    }

    if (options.partCategory && options.partCategory !== "all") {
      query = query.eq("part_category", options.partCategory);
    }
    if (options.complaintCategory && options.complaintCategory !== "all") {
      query = query.eq("complaint_category", options.complaintCategory);
    }

    switch (options.reviewFilter) {
      case "unclassified":
        query = query.eq("is_excluded", false).or(
          "manufacturer_name.eq.未分類,part_category.eq.unclassified,complaint_category.eq.unclassified"
        );
        break;
      case "unreviewed":
        query = query
          .eq("is_excluded", false)
          .eq("classification_status", "unreviewed")
          .neq("manufacturer_name", "未分類")
          .neq("part_category", "unclassified")
          .neq("complaint_category", "unclassified");
        break;
      case "confirmed":
        query = query.eq("is_excluded", false).eq("classification_status", "confirmed");
        break;
      case "excluded":
        query = query.eq("is_excluded", true);
        break;
      default:
        query = query.eq("is_excluded", false);
    }
    return query;
  }

  async function fetchAdminRecords(options) {
    requireClient();
    const page = options.page || 1;
    const pageSize = options.pageSize || 50;
    const from = (page - 1) * pageSize;
    let query = client
      .from("tuning_part_regrets")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: options.sortOrder === "asc" })
      .range(from, from + pageSize - 1);
    query = applyAdminFilters(query, options);

    const { data, error, count } = await query;
    if (error) throw error;
    return { rows: data || [], count: count || 0 };
  }

  async function fetchAllAdminRecords(options) {
    requireClient();
    let query = client
      .from("tuning_part_regrets")
      .select("*")
      .order("created_at", { ascending: options.sortOrder === "asc" });
    query = applyAdminFilters(query, { ...options, reviewFilter: options.reviewFilter || "all" });
    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  }

  async function countRows(configure) {
    let query = client.from("tuning_part_regrets").select("*", { count: "exact", head: true });
    query = configure(query);
    const result = await query;
    if (result.error) throw result.error;
    return result.count || 0;
  }

  async function fetchStats() {
    requireClient();
    const [active, unclassified, unreviewed, excluded] = await Promise.all([
      countRows((query) => query.eq("is_excluded", false)),
      countRows((query) => query.eq("is_excluded", false).or(
        "manufacturer_name.eq.未分類,part_category.eq.unclassified,complaint_category.eq.unclassified"
      )),
      countRows((query) => query
        .eq("is_excluded", false)
        .eq("classification_status", "unreviewed")
        .neq("manufacturer_name", "未分類")
        .neq("part_category", "unclassified")
        .neq("complaint_category", "unclassified")),
      countRows((query) => query.eq("is_excluded", true))
    ]);
    return { active, unclassified, unreviewed, excluded };
  }

  async function updateRecord(id, payload) {
    requireClient();
    const allowed = [
      "manufacturer_name", "part_category", "complaint_category",
      "classification_status", "is_excluded", "reviewed_at"
    ];
    const safePayload = {};
    allowed.forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(payload, key)) safePayload[key] = payload[key];
    });
    const { error } = await client.from("tuning_part_regrets").update(safePayload).eq("id", id);
    if (error) throw error;
  }

  async function upsertAlias(payload) {
    requireClient();
    const aliasText = String(payload.alias_text || "").trim();
    const row = {
      alias_kind: payload.alias_kind,
      alias_text: aliasText,
      alias_normalized: window.TuningClassifier.normalize(aliasText),
      canonical_value: payload.canonical_value
    };
    const { error } = await client
      .from("classification_aliases")
      .upsert(row, { onConflict: "alias_kind,alias_normalized" });
    if (error) throw error;
  }

  window.TuningSupabase = {
    client,
    hasSupabaseConfig,
    fetchAdminRecords,
    fetchAllAdminRecords,
    fetchPublicAliases,
    fetchStats,
    getSession,
    insertRegret,
    onAuthStateChange,
    signIn,
    signOut,
    updatePassword,
    updateRecord,
    upsertAlias
  };
})();
