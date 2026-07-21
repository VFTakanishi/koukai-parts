(function () {
  const elements = {
    loginSection: document.getElementById("loginSection"),
    passwordResetSection: document.getElementById("passwordResetSection"),
    dashboardSection: document.getElementById("dashboardSection"),
    logoutButton: document.getElementById("logoutButton"),
    loginForm: document.getElementById("loginForm"),
    loginButton: document.getElementById("loginButton"),
    loginMessage: document.getElementById("loginMessage"),
    passwordResetForm: document.getElementById("passwordResetForm"),
    passwordResetButton: document.getElementById("passwordResetButton"),
    passwordResetMessage: document.getElementById("passwordResetMessage"),
    recordsBody: document.getElementById("recordsBody"),
    recordsMessage: document.getElementById("recordsMessage"),
    searchInput: document.getElementById("searchInput"),
    reviewFilter: document.getElementById("reviewFilter"),
    partFilter: document.getElementById("partCategoryFilter"),
    complaintFilter: document.getElementById("complaintCategoryFilter"),
    justificationTypeFilter: document.getElementById("justificationTypeFilter"),
    sortOrder: document.getElementById("sortOrder"),
    refreshButton: document.getElementById("refreshButton"),
    csvButton: document.getElementById("csvButton"),
    prevButton: document.getElementById("prevPageButton"),
    nextButton: document.getElementById("nextPageButton"),
    pageInfo: document.getElementById("pageInfo"),
    activeCount: document.getElementById("activeCount"),
    unclassifiedCount: document.getElementById("unclassifiedCount"),
    unreviewedCount: document.getElementById("unreviewedCount"),
    excludedCount: document.getElementById("excludedCount"),
    aliasDialog: document.getElementById("aliasDialog"),
    aliasForm: document.getElementById("aliasForm"),
    aliasMessage: document.getElementById("aliasMessage")
  };

  const state = {
    page: 1,
    pageSize: 50,
    total: 0,
    rows: [],
    activeAliasRecord: null,
    searchTimer: null
  };

  let recoveryMode = /(?:#|&|\?)type=recovery(?:&|$)/.test(window.location.href);

  function setMessage(element, text, type) {
    element.textContent = text;
    element.className = type ? `message ${type}` : "message";
  }

  function formatDate(value) {
    return new Date(value).toLocaleString("ja-JP", {
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit"
    });
  }

  function makeOption(value, label, selected) {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    option.selected = value === selected;
    return option;
  }

  function populateFilters() {
    elements.partFilter.replaceChildren(makeOption("all", "すべて", "all"));
    window.TuningClassifier.partDefinitions.forEach((item) => {
      elements.partFilter.appendChild(makeOption(item.slug, item.label));
    });
    elements.partFilter.appendChild(makeOption("unclassified", "未分類"));

    elements.complaintFilter.replaceChildren(makeOption("all", "すべて", "all"));
    window.TuningClassifier.complaintDefinitions.forEach((item) => {
      elements.complaintFilter.appendChild(makeOption(item.slug, item.label));
    });
    elements.complaintFilter.appendChild(makeOption("unclassified", "未分類"));
  }

  function createClassificationSelect(definitions, selected) {
    const select = document.createElement("select");
    select.appendChild(makeOption("unclassified", "未分類", selected));
    definitions.forEach((item) => select.appendChild(makeOption(item.slug, item.label, selected)));
    return select;
  }

  function statusFor(row) {
    if (row.is_excluded) return { text: "除外", className: "excluded" };
    if (row.manufacturer_name === "未分類" || row.part_category === "unclassified" || row.complaint_category === "unclassified") {
      return { text: "未分類", className: "unclassified" };
    }
    if (row.classification_status === "confirmed") return { text: "確認済み", className: "confirmed" };
    return { text: "未確認", className: "unreviewed" };
  }

  function createSourceCell(text) {
    const td = document.createElement("td");
    const paragraph = document.createElement("p");
    paragraph.className = "source-text";
    paragraph.textContent = text;
    td.appendChild(paragraph);
    return td;
  }

  function renderRows(rows) {
    elements.recordsBody.replaceChildren();
    if (!rows.length) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 9;
      cell.textContent = "条件に合う投稿はありません。";
      row.appendChild(cell);
      elements.recordsBody.appendChild(row);
      return;
    }

    rows.forEach((record) => {
      const row = document.createElement("tr");
      row.dataset.id = record.id;
      if (record.is_excluded) row.classList.add("is-excluded");

      const dateCell = document.createElement("td");
      dateCell.textContent = formatDate(record.created_at);
      row.appendChild(dateCell);
      row.appendChild(createSourceCell(record.product_text));
      row.appendChild(createSourceCell(record.disappointment_text));

      const manufacturerCell = document.createElement("td");
      const manufacturerInput = document.createElement("input");
      manufacturerInput.className = "manufacturer-input";
      manufacturerInput.value = record.manufacturer_name || "未分類";
      manufacturerInput.maxLength = 100;
      manufacturerCell.appendChild(manufacturerInput);
      row.appendChild(manufacturerCell);

      const partCell = document.createElement("td");
      const partSelect = createClassificationSelect(window.TuningClassifier.partDefinitions, record.part_category);
      partSelect.className = "part-select";
      partCell.appendChild(partSelect);
      row.appendChild(partCell);

      const complaintCell = document.createElement("td");
      const complaintSelect = createClassificationSelect(window.TuningClassifier.complaintDefinitions, record.complaint_category);
      complaintSelect.className = "complaint-select";
      complaintCell.appendChild(complaintSelect);
      row.appendChild(complaintCell);

      const justificationCell = document.createElement("td");
      const justificationBadge = document.createElement("span");
      const justificationLabels = { specific: "専用", generic: "汎用", unknown: "未記録" };
      const justificationType = record.justification_type || "unknown";
      justificationBadge.className = `status-badge ${justificationType === "generic" ? "unclassified" : "confirmed"}`;
      justificationBadge.textContent = justificationLabels[justificationType] || "未記録";
      justificationCell.appendChild(justificationBadge);
      row.appendChild(justificationCell);

      const statusCell = document.createElement("td");
      const badge = document.createElement("span");
      const status = statusFor(record);
      badge.className = `status-badge ${status.className}`;
      badge.textContent = status.text;
      statusCell.appendChild(badge);
      row.appendChild(statusCell);

      const actionsCell = document.createElement("td");
      const actions = document.createElement("div");
      actions.className = "row-actions";
      const saveButton = document.createElement("button");
      saveButton.type = "button";
      saveButton.className = "button button-primary button-small save-button";
      saveButton.dataset.action = "save";
      saveButton.textContent = "確認して保存";
      const aliasButton = document.createElement("button");
      aliasButton.type = "button";
      aliasButton.className = "button button-outline button-small";
      aliasButton.dataset.action = "alias";
      aliasButton.textContent = "辞書登録";
      const excludeButton = document.createElement("button");
      excludeButton.type = "button";
      excludeButton.className = "button button-danger button-small";
      excludeButton.dataset.action = "exclude";
      excludeButton.textContent = record.is_excluded ? "除外を戻す" : "集計から除外";
      actions.append(saveButton, aliasButton, excludeButton);
      actionsCell.appendChild(actions);
      row.appendChild(actionsCell);
      elements.recordsBody.appendChild(row);
    });
  }

  function currentOptions() {
    return {
      page: state.page,
      pageSize: state.pageSize,
      search: elements.searchInput.value.trim(),
      reviewFilter: elements.reviewFilter.value,
      partCategory: elements.partFilter.value,
      complaintCategory: elements.complaintFilter.value,
      justificationType: elements.justificationTypeFilter.value,
      sortOrder: elements.sortOrder.value
    };
  }

  async function loadRows() {
    setMessage(elements.recordsMessage, "読み込み中です。", "");
    const result = await window.TuningSupabase.fetchAdminRecords(currentOptions());
    state.rows = result.rows;
    state.total = result.count;
    const totalPages = Math.max(1, Math.ceil(state.total / state.pageSize));
    if (state.page > totalPages) {
      state.page = totalPages;
      return loadRows();
    }
    renderRows(state.rows);
    elements.pageInfo.textContent = `${state.total}件 / ${state.page}ページ目（全${totalPages}ページ）`;
    elements.prevButton.disabled = state.page <= 1;
    elements.nextButton.disabled = state.page >= totalPages;
    setMessage(elements.recordsMessage, "", "");
  }

  async function loadStats() {
    const stats = await window.TuningSupabase.fetchStats();
    elements.activeCount.textContent = stats.active;
    elements.unclassifiedCount.textContent = stats.unclassified;
    elements.unreviewedCount.textContent = stats.unreviewed;
    elements.excludedCount.textContent = stats.excluded;
  }

  async function refreshDashboard() {
    try {
      await Promise.all([loadRows(), loadStats()]);
    } catch (error) {
      console.error("Failed to load admin data.", error);
      setMessage(elements.recordsMessage, "データを読み込めませんでした。設定と通信状態を確認してください。", "error");
    }
  }

  function findRecord(id) {
    return state.rows.find((row) => String(row.id) === String(id));
  }

  function valuesFromRow(rowElement) {
    return {
      manufacturer: rowElement.querySelector(".manufacturer-input").value.trim() || "未分類",
      part: rowElement.querySelector(".part-select").value,
      complaint: rowElement.querySelector(".complaint-select").value
    };
  }

  async function saveRow(rowElement, button) {
    const values = valuesFromRow(rowElement);
    const confirmed = values.manufacturer !== "未分類" && values.part !== "unclassified" && values.complaint !== "unclassified";
    button.disabled = true;
    try {
      await window.TuningSupabase.updateRecord(rowElement.dataset.id, {
        manufacturer_name: values.manufacturer,
        part_category: values.part,
        complaint_category: values.complaint,
        classification_status: confirmed ? "confirmed" : "unreviewed",
        reviewed_at: confirmed ? new Date().toISOString() : null
      });
      setMessage(elements.recordsMessage, confirmed ? "分類を確認済みとして保存しました。" : "未分類を残したまま保存しました。", "success");
      await refreshDashboard();
    } catch (error) {
      console.error("Failed to save classification.", error);
      setMessage(elements.recordsMessage, "分類を保存できませんでした。", "error");
    } finally {
      button.disabled = false;
    }
  }

  async function toggleExcluded(record, button) {
    button.disabled = true;
    try {
      await window.TuningSupabase.updateRecord(record.id, { is_excluded: !record.is_excluded });
      setMessage(elements.recordsMessage, record.is_excluded ? "投稿を集計対象へ戻しました。" : "投稿を集計から除外しました。", "success");
      await refreshDashboard();
    } catch (error) {
      console.error("Failed to toggle exclusion.", error);
      setMessage(elements.recordsMessage, "除外状態を変更できませんでした。", "error");
    } finally {
      button.disabled = false;
    }
  }

  function guessManufacturerAlias(productText) {
    const separators = productText.split(/(?:の|製|\s|・)/).map((text) => text.trim()).filter(Boolean);
    if (separators[0] && separators[0].length <= 30) return separators[0];
    const partWords = ["車高調", "マフラー", "タイヤ", "ホイール", "ブレーキ", "クラッチ", "エアロ", "メーター", "オイル", "スロコン", "タワーバー", "オーディオ"];
    const indexes = partWords.map((word) => productText.indexOf(word)).filter((index) => index > 0);
    if (indexes.length) return productText.slice(0, Math.min(...indexes)).trim();
    return productText.slice(0, 30).trim();
  }

  function guessPartAlias(productText) {
    const words = ["車高調", "サスペンション", "ショック", "マフラー", "エアクリーナー", "エアクリ", "タービン", "ECU", "ブレーキパッド", "ブレーキ", "クラッチ", "LSD", "ホイール", "タイヤ", "エアロ", "シート", "メーター", "ラジエーター", "エンジンオイル", "タワーバー", "スロコン", "オーディオ"];
    return words.find((word) => productText.toLowerCase().includes(word.toLowerCase())) || productText;
  }

  function openAliasDialog(record, rowElement) {
    const values = valuesFromRow(rowElement);
    state.activeAliasRecord = { record, values };
    document.getElementById("useManufacturerAlias").checked = false;
    document.getElementById("usePartAlias").checked = false;
    document.getElementById("useComplaintAlias").checked = false;
    document.getElementById("manufacturerAlias").value = guessManufacturerAlias(record.product_text);
    document.getElementById("manufacturerCanonical").value = values.manufacturer;
    document.getElementById("partAlias").value = guessPartAlias(record.product_text);
    document.getElementById("partCanonical").value = window.TuningClassifier.fromDbPartCategory(values.part);
    document.getElementById("partCanonical").dataset.value = values.part;
    document.getElementById("complaintAlias").value = record.disappointment_text;
    document.getElementById("complaintCanonical").value = window.TuningClassifier.fromDbComplaintCategory(values.complaint);
    document.getElementById("complaintCanonical").dataset.value = values.complaint;
    setMessage(elements.aliasMessage, "", "");
    elements.aliasDialog.showModal();
  }

  async function saveAliases(event) {
    event.preventDefault();
    const requests = [];
    const recordUpdates = {};
    const add = (checkboxId, kind, aliasId, canonicalValue) => {
      if (!document.getElementById(checkboxId).checked) return;
      const alias = document.getElementById(aliasId).value.trim();
      if (!alias || !canonicalValue || canonicalValue === "未分類" || canonicalValue === "unclassified") {
        throw new Error("未分類の項目や空の表記は辞書へ登録できません。");
      }
      requests.push(window.TuningSupabase.upsertAlias({ alias_kind: kind, alias_text: alias, canonical_value: canonicalValue }));
      if (kind === "manufacturer") recordUpdates.manufacturer_name = canonicalValue;
      if (kind === "part") recordUpdates.part_category = canonicalValue;
      if (kind === "complaint") recordUpdates.complaint_category = canonicalValue;
    };

    try {
      const current = state.activeAliasRecord;
      add("useManufacturerAlias", "manufacturer", "manufacturerAlias", current.values.manufacturer);
      add("usePartAlias", "part", "partAlias", document.getElementById("partCanonical").dataset.value);
      add("useComplaintAlias", "complaint", "complaintAlias", document.getElementById("complaintCanonical").dataset.value);
      if (!requests.length) throw new Error("登録する表記を選んでください。");
      await Promise.all(requests);
      if (Object.keys(recordUpdates).length) {
        await window.TuningSupabase.updateRecord(current.record.id, recordUpdates);
      }
      const aliases = await window.TuningSupabase.fetchPublicAliases();
      window.TuningClassifier.setLearnedAliases(aliases);
      elements.aliasDialog.close();
      setMessage(elements.recordsMessage, `${requests.length}件の表記を辞書へ登録しました。`, "success");
      await refreshDashboard();
    } catch (error) {
      console.error("Failed to save aliases.", error);
      setMessage(elements.aliasMessage, error.message || "辞書へ登録できませんでした。", "error");
    }
  }

  function csvEscape(value) {
    let text = value == null ? "" : String(value);
    if (/^[=+\-@]/.test(text)) text = `'${text}`;
    return `"${text.replace(/"/g, '""')}"`;
  }

  function exportStatus(row) {
    return statusFor(row).text;
  }

  function buildCsv(rows) {
    const headers = ["投稿日時", "入力されたメーカー・パーツ", "入力された後悔理由", "メーカー分類", "パーツ分類", "後悔理由分類", "正当化文", "確認状態"];
    const lines = [headers.map(csvEscape).join(",")];
    rows.forEach((row) => {
      lines.push([
        formatDate(row.created_at), row.product_text, row.disappointment_text,
        row.manufacturer_name, window.TuningClassifier.fromDbPartCategory(row.part_category),
        window.TuningClassifier.fromDbComplaintCategory(row.complaint_category),
        ({ specific: "専用", generic: "汎用", unknown: "未記録" }[row.justification_type] || "未記録"),
        exportStatus(row)
      ].map(csvEscape).join(","));
    });
    return "\uFEFF" + lines.join("\r\n");
  }

  async function downloadCsv() {
    elements.csvButton.disabled = true;
    try {
      const rows = await window.TuningSupabase.fetchAllAdminRecords({
        search: "", reviewFilter: "all", partCategory: "all", complaintCategory: "all", justificationType: "all", sortOrder: "desc"
      });
      const blob = new Blob([buildCsv(rows)], { type: "text/csv;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      const date = new Date().toISOString().slice(0, 10);
      anchor.href = url;
      anchor.download = `後悔パーツ投稿データ_${date}.csv`;
      anchor.click();
      URL.revokeObjectURL(url);
      setMessage(elements.recordsMessage, `${rows.length}件をCSVへ出力しました。匿名IDと除外投稿は含まれません。`, "success");
    } catch (error) {
      console.error("Failed to export CSV.", error);
      setMessage(elements.recordsMessage, "CSVを出力できませんでした。", "error");
    } finally {
      elements.csvButton.disabled = false;
    }
  }

  async function showDashboard() {
    elements.loginSection.classList.add("hidden");
    elements.passwordResetSection.classList.add("hidden");
    elements.dashboardSection.classList.remove("hidden");
    elements.logoutButton.hidden = false;
    await refreshDashboard();
  }

  function showLogin() {
    elements.dashboardSection.classList.add("hidden");
    elements.passwordResetSection.classList.add("hidden");
    elements.loginSection.classList.remove("hidden");
    elements.logoutButton.hidden = true;
  }

  function showPasswordReset() {
    elements.loginSection.classList.add("hidden");
    elements.dashboardSection.classList.add("hidden");
    elements.passwordResetSection.classList.remove("hidden");
    elements.logoutButton.hidden = true;
    document.getElementById("newPassword").focus();
  }

  elements.loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    elements.loginButton.disabled = true;
    try {
      await window.TuningSupabase.signIn(document.getElementById("email").value.trim(), document.getElementById("password").value);
      setMessage(elements.loginMessage, "", "");
      await showDashboard();
    } catch (error) {
      console.error("Failed to sign in.", error);
      setMessage(elements.loginMessage, "ログインできませんでした。メールアドレスとパスワードを確認してください。", "error");
    } finally {
      elements.loginButton.disabled = false;
    }
  });

  elements.passwordResetForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    const password = document.getElementById("newPassword").value;
    const confirmation = document.getElementById("newPasswordConfirm").value;
    setMessage(elements.passwordResetMessage, "", "");

    if (password.length < 8) {
      setMessage(elements.passwordResetMessage, "パスワードは8文字以上で入力してください。", "error");
      return;
    }
    if (password !== confirmation) {
      setMessage(elements.passwordResetMessage, "2つのパスワードが一致していません。", "error");
      return;
    }

    elements.passwordResetButton.disabled = true;
    try {
      await window.TuningSupabase.updatePassword(password);
      recoveryMode = false;
      window.history.replaceState({}, document.title, window.location.pathname);
      setMessage(elements.passwordResetMessage, "パスワードを変更しました。管理画面を開きます。", "success");
      window.setTimeout(showDashboard, 600);
    } catch (error) {
      console.error("Failed to reset password.", error);
      setMessage(elements.passwordResetMessage, "パスワードを変更できませんでした。再設定メールをもう一度発行してください。", "error");
    } finally {
      elements.passwordResetButton.disabled = false;
    }
  });

  elements.logoutButton.addEventListener("click", async function () {
    await window.TuningSupabase.signOut();
    showLogin();
  });

  elements.recordsBody.addEventListener("click", function (event) {
    const button = event.target.closest("button[data-action]");
    if (!button) return;
    const rowElement = button.closest("tr[data-id]");
    const record = findRecord(rowElement.dataset.id);
    if (button.dataset.action === "save") saveRow(rowElement, button);
    if (button.dataset.action === "exclude") toggleExcluded(record, button);
    if (button.dataset.action === "alias") openAliasDialog(record, rowElement);
  });

  document.querySelectorAll("[data-status-filter]").forEach((button) => button.addEventListener("click", function () {
    elements.reviewFilter.value = button.dataset.statusFilter;
    state.page = 1;
    loadRows();
  }));

  [elements.reviewFilter, elements.partFilter, elements.complaintFilter, elements.justificationTypeFilter, elements.sortOrder].forEach((control) => {
    control.addEventListener("change", function () { state.page = 1; loadRows(); });
  });
  elements.searchInput.addEventListener("input", function () {
    window.clearTimeout(state.searchTimer);
    state.searchTimer = window.setTimeout(function () { state.page = 1; loadRows(); }, 250);
  });
  elements.refreshButton.addEventListener("click", refreshDashboard);
  elements.csvButton.addEventListener("click", downloadCsv);
  elements.prevButton.addEventListener("click", function () { if (state.page > 1) { state.page -= 1; loadRows(); } });
  elements.nextButton.addEventListener("click", function () { state.page += 1; loadRows(); });
  elements.aliasForm.addEventListener("submit", saveAliases);
  document.getElementById("closeAliasDialog").addEventListener("click", () => elements.aliasDialog.close());
  document.getElementById("cancelAliasButton").addEventListener("click", () => elements.aliasDialog.close());

  async function initialize() {
    populateFilters();
    if (!window.TuningSupabase.hasSupabaseConfig) {
      setMessage(elements.loginMessage, "先に接続設定を完了してください。", "error");
      return;
    }
    window.TuningSupabase.onAuthStateChange(function (event) {
      if (event === "PASSWORD_RECOVERY") {
        recoveryMode = true;
        showPasswordReset();
      }
    });
    try {
      const aliases = await window.TuningSupabase.fetchPublicAliases();
      window.TuningClassifier.setLearnedAliases(aliases);
    } catch (error) {
      console.warn("Aliases could not be loaded.", error);
    }
    const session = await window.TuningSupabase.getSession();
    if (recoveryMode && session) showPasswordReset();
    else if (session) await showDashboard();
    else if (recoveryMode) {
      showLogin();
      setMessage(elements.loginMessage, "再設定リンクを確認できませんでした。新しい再設定メールを発行してください。", "error");
    } else showLogin();
  }

  initialize().catch(function (error) {
    console.error("Failed to initialize admin.", error);
    setMessage(elements.loginMessage, "管理画面を開始できませんでした。", "error");
  });
})();
