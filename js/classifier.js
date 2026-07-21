(function () {
  const complaintDefinitions = [
    { label: "耐久性", slug: "durability", keywords: ["へたる", "へたった", "抜ける", "抜けた", "壊れる", "壊れた", "割れる", "漏れる", "漏れ", "ダメになる", "寿命", "減りが早い", "すぐ減る", "ひび"] },
    { label: "性能", slug: "performance", keywords: ["パワーが出ない", "抜けが悪い", "遅い", "効かない", "効きが悪い", "効きすぎ", "止まらない", "変わらない", "違いが分からない", "効果がない", "伸びない", "加速が鈍い", "物足りない", "下がらない", "冷えない", "グリップしない"] },
    { label: "快適性", slug: "comfort", keywords: ["乗り心地", "硬い", "跳ねる", "疲れる", "重い", "つらい", "扱いづらい", "乗りにくい", "ギクシャク", "痛い", "振動", "蒸れる"] },
    { label: "音", slug: "sound", keywords: ["うるさい", "こもり音", "こもる", "異音", "静かすぎる", "音が大きい", "バキバキ", "ビビる", "鳴き", "ロードノイズ"] },
    { label: "取付精度", slug: "fitment", keywords: ["フィッティング", "合わない", "干渉", "加工が必要", "付かない", "つかない", "ズレる", "隙間", "チリ"] },
    { label: "見た目", slug: "appearance", keywords: ["ダサい", "色が違う", "安っぽい", "イメージと違う", "見た目", "映えない", "見づらい", "見にくい", "読みにくい", "汚れる", "ダスト"] },
    { label: "費用", slug: "cost", keywords: ["高い", "工賃", "追加費用", "予算オーバー", "金がかかる", "高すぎる", "コスパが悪い"] },
    { label: "法規・実用性", slug: "legal_practicality", keywords: ["車検", "最低地上高", "公道", "使いづらい", "普段使い", "乗り降り", "はみ出す"] },
    { label: "納期・供給", slug: "delivery_supply", keywords: ["届かない", "納期", "欠品", "廃盤", "来ない", "手に入らない"] },
    { label: "その他", slug: "other", keywords: [] }
  ];

  const partDefinitions = [
    { label: "車高調・サスペンション", slug: "suspension", keywords: ["車高調", "サスペンション", "ショック", "ダンパー", "スプリング", "足回り"] },
    { label: "マフラー・排気系", slug: "exhaust", keywords: ["マフラー", "触媒", "キャタ", "排気", "エキマニ", "フロントパイプ", "センターパイプ"] },
    { label: "エアクリーナー・吸気系", slug: "intake", keywords: ["エアクリ", "エアクリーナー", "インテーク", "吸気", "サクション"] },
    { label: "タービン・過給機", slug: "forced_induction", keywords: ["タービン", "過給機", "ブースト", "スーパーチャージャー"] },
    { label: "ECU・電子制御", slug: "ecu", keywords: ["ecu", "rom", "コンピュータ", "電子制御", "セッティング"] },
    { label: "ブレーキ", slug: "brake", keywords: ["ブレーキ", "ローター", "パッド", "キャリパー"] },
    { label: "クラッチ", slug: "clutch", keywords: ["クラッチ"] },
    { label: "LSD・駆動系", slug: "drivetrain", keywords: ["lsd", "デフ", "駆動", "シャフト"] },
    { label: "ホイール", slug: "wheel", keywords: ["ホイール", "アルミホイール"] },
    { label: "タイヤ", slug: "tire", keywords: ["タイヤ", "ポテンザ", "ネオバ", "ディレッツァ"] },
    { label: "エアロ・外装", slug: "aero_exterior", keywords: ["エアロ", "バンパー", "スポイラー", "フェンダー", "外装"] },
    { label: "シート・内装", slug: "interior", keywords: ["シート", "内装", "ステアリング", "ハンドル"] },
    { label: "メーター", slug: "meter", keywords: ["メーター", "追加メーター"] },
    { label: "冷却系", slug: "cooling", keywords: ["ラジエーター", "オイルクーラー", "インタークーラー", "冷却"] },
    { label: "オイル類", slug: "engine_oil", keywords: ["エンジンオイル", "モーターオイル", "ギアオイル", "ミッションオイル", "デフオイル", "ATF", "CVTF", "ブレーキフルード", "潤滑油"] },
    { label: "タワーバー・ボディ補強", slug: "body_brace", keywords: ["タワーバー", "ストラットバー", "ボディ補強", "補強バー"] },
    { label: "スロットルコントローラー", slug: "throttle_controller", keywords: ["スロコン", "スロットルコントローラー", "アクセルコントローラー"] },
    { label: "カーオーディオ", slug: "car_audio", keywords: ["カーオーディオ", "オーディオ", "スピーカー", "ウーファー", "サブウーファー", "アンプ"] },
    { label: "エンジン部品", slug: "engine", keywords: ["ピストン", "カム", "エンジン", "ヘッド", "ポンプ", "インジェクター"] },
    { label: "その他", slug: "other", keywords: [] }
  ];

  const fallbackPart = { label: "未分類", slug: "unclassified" };
  const fallbackComplaint = { label: "未分類", slug: "unclassified" };
  const fallbackManufacturer = "未分類";
  const builtInManufacturerAliases = [
    ["ブリッツ", "BLITZ"], ["blitz", "BLITZ"], ["hks", "HKS"],
    ["テイン", "TEIN"], ["tein", "TEIN"], ["柿本改", "柿本改"],
    ["柿本", "柿本改"], ["ガナドール", "GANADOR"], ["ganador", "GANADOR"],
    ["クスコ", "CUSCO"], ["cusco", "CUSCO"], ["トラスト", "TRUST"],
    ["trust", "TRUST"], ["レイズ", "RAYS"], ["rays", "RAYS"],
    ["ヨコハマ", "YOKOHAMA"], ["ブリヂストン", "BRIDGESTONE"],
    ["ダンロップ", "DUNLOP"], ["エンドレス", "ENDLESS"], ["endless", "ENDLESS"]
  ];
  let learnedAliases = [];
  const complaintPatterns = {
    durability: [
      /へた(?:る|った|って|り)?/,
      /(?:壊|割)(?:れる|れた|れやす|れ)/,
      /(?:漏|滲|にじ)(?:れ|み|む|ん|た)/,
      /(?:寿命|持ち).*(?:短|悪)/,
      /(?:すぐ|早く).*(?:減|ダメ)/
    ],
    performance: [
      /(?:パワー|馬力|トルク).*(?:出ない|出なかった|増えない|増えなかった|落ち)/,
      /抜け.*悪/,
      /(?:加速|出足|伸び|効き|効果).*(?:悪|鈍|遅|ない|なかった)/,
      /(?:違い|変化).*(?:分から|わから|ない|なかった|感じない)/,
      /(?:下がら|冷え)(?:ない|なかった)/
    ],
    comfort: [
      /乗り心地/,
      /(?:硬|固|重)(?:い|く|かった|すぎ)/,
      /(?:疲れ|つら|しんど|痛)(?:る|た|い|かった)/,
      /(?:跳|は)ね(?:る|た|て)?/,
      /(?:扱|乗り)(?:い)?(?:づら|にく)/,
      /(?:ギクシャク|振動|蒸れ)/
    ],
    sound: [/(?:うるさ|こもり|こもる|異音|バキバキ|ビビり|きしみ|鳴き|ロードノイズ|作動音)/],
    fitment: [/(?:フィッティング|合わない|合わなかった|干渉|加工|付かない|付かなかった|隙間|チリ|ずれ)/],
    appearance: [/(?:ダサ|色が違|安っぽ|イメージと違|見た目|映えない|見づら|見にく|読みにく|汚れ|ダスト)/],
    cost: [/(?:高い|高かった|高すぎ|工賃|追加費用|予算オーバー|金がかか|コスパ)/],
    legal_practicality: [/(?:車検|最低地上高|公道|普段使い|乗り降り|はみ出)/],
    delivery_supply: [/(?:届かない|届かなかった|納期|欠品|廃盤|来ない|来なかった|手に入ら)/]
  };
  const vaguePhrases = ["なんとなく", "微妙", "いまいち", "イマイチ", "気に入らない", "思っていた感じと違う", "思ってた感じと違う", "期待外れ", "よく分からない"];
  const safetyParts = ["ブレーキ", "タイヤ", "ステアリング", "ハンドル"];
  const safetyIssues = ["効かない", "効きが悪い", "止まらない", "滑る", "バースト", "破裂", "パンク", "空気が抜け", "エア漏れ", "空気圧", "亀裂", "ひび", "脱輪", "緩み", "振動", "異音", "漏れ", "歪み", "歪ん", "ガタつ", "ガタガタ"];
  const directSafetyIssues = ["燃料漏れ", "ガソリン漏れ", "オイル漏れ", "白煙"];

  function normalize(text) {
    return String(text || "")
      .normalize("NFKC")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "");
  }

  function normalizeForDedup(text) {
    return normalize(text).replace(/[、。,.・\/\\_\-ー―‐:：;；!！?？()（）\[\]【】「」『』]/g, "");
  }

  function includesAny(text, keywords) {
    const normalized = normalize(text);
    return keywords.some((keyword) => normalized.includes(normalize(keyword)));
  }

  function classifyByKeywords(text, definitions, fallbackLabel) {
    const normalized = normalize(text);
    const match = definitions
      .flatMap((definition) => definition.keywords.map((keyword) => ({
        definition,
        keyword: normalize(keyword)
      })))
      .filter((item) => item.keyword && normalized.includes(item.keyword))
      .sort((a, b) => b.keyword.length - a.keyword.length)[0];
    return match ? match.definition.label : fallbackLabel;
  }

  function detectSafetyWarning(productText, disappointmentText) {
    const productIsSafetyRelated = includesAny(`${productText} ${disappointmentText}`, safetyParts);
    return includesAny(disappointmentText, directSafetyIssues) ||
      (productIsSafetyRelated && includesAny(disappointmentText, safetyIssues));
  }

  function isVagueDisappointment(text) {
    const normalized = normalize(text);
    return normalized.length <= 4 || includesAny(normalized, vaguePhrases);
  }

  function classifyPart(productText) {
    const learned = findLearnedAlias("part", productText);
    if (learned) {
      return fromDbPartCategory(learned.canonical_value);
    }
    return classifyByKeywords(productText, partDefinitions, fallbackPart.label);
  }

  function classifyComplaint(disappointmentText) {
    const learned = findLearnedAlias("complaint", disappointmentText);
    if (learned) {
      return fromDbComplaintCategory(learned.canonical_value);
    }
    const target = normalize(disappointmentText);
    const definition = complaintDefinitions.find((item) =>
      (complaintPatterns[item.slug] || []).some((pattern) => pattern.test(target)) ||
      includesAny(target, item.keywords)
    );
    return definition ? definition.label : fallbackComplaint.label;
  }

  function findLearnedAlias(kind, text) {
    const target = normalize(text);
    return learnedAliases
      .filter((item) => item.alias_kind === kind && item.alias_normalized)
      .sort((a, b) => b.alias_normalized.length - a.alias_normalized.length)
      .find((item) => target.includes(item.alias_normalized));
  }

  function classifyManufacturer(productText) {
    const learned = findLearnedAlias("manufacturer", productText);
    if (learned) {
      return learned.canonical_value;
    }

    const target = normalize(productText);
    const builtIn = builtInManufacturerAliases
      .slice()
      .sort((a, b) => b[0].length - a[0].length)
      .find(([alias]) => target.includes(normalize(alias)));
    return builtIn ? builtIn[1] : fallbackManufacturer;
  }

  function setLearnedAliases(aliases) {
    learnedAliases = (aliases || []).map((item) => ({
      ...item,
      alias_normalized: normalize(item.alias_normalized || item.alias_text)
    }));
  }

  function toDbPartCategory(label) {
    const match = partDefinitions.find((item) => item.label === label);
    return match ? match.slug : fallbackPart.slug;
  }

  function toDbComplaintCategory(label) {
    const match = complaintDefinitions.find((item) => item.label === label);
    return match ? match.slug : fallbackComplaint.slug;
  }

  function fromDbPartCategory(value) {
    const match = partDefinitions.find((item) => item.slug === value || item.label === value);
    return match ? match.label : fallbackPart.label;
  }

  function fromDbComplaintCategory(value) {
    const match = complaintDefinitions.find((item) => item.slug === value || item.label === value);
    return match ? match.label : fallbackComplaint.label;
  }

  window.TuningClassifier = {
    complaintCategories: ["すべて", ...complaintDefinitions.map((item) => item.label), fallbackComplaint.label],
    complaintDefinitions: complaintDefinitions.map((item) => ({ label: item.label, slug: item.slug })),
    partCategories: ["すべて", ...partDefinitions.map((item) => item.label), fallbackPart.label],
    partDefinitions: partDefinitions.map((item) => ({ label: item.label, slug: item.slug })),
    classifyComplaint,
    classifyManufacturer,
    classifyPart,
    detectSafetyWarning,
    isVagueDisappointment,
    fromDbComplaintCategory,
    fromDbPartCategory,
    normalize,
    normalizeForDedup,
    setLearnedAliases,
    toDbComplaintCategory,
    toDbPartCategory
  };
})();
