(function () {
  const cooldownMs = 4000;
  let cooldownUntil = 0;
  let latestResult = null;
  const visitorStorageKey = "tuning-regret-anonymous-id";

  const form = document.getElementById("justification-form");
  const productInput = document.getElementById("productText");
  const disappointmentInput = document.getElementById("disappointmentText");
  const honeypotInput = document.getElementById("companyName");
  const submitButton = document.getElementById("submitButton");
  const formMessage = document.getElementById("formMessage");
  const resultSection = document.getElementById("resultSection");
  const safetyWarning = document.getElementById("safetyWarning");
  const resultProduct = document.getElementById("resultProduct");
  const resultDisappointment = document.getElementById("resultDisappointment");
  const resultText = document.getElementById("resultText");
  const specificityHint = document.getElementById("specificityHint");
  const resultMessage = document.getElementById("resultMessage");
  const alternateButton = document.getElementById("alternateButton");
  const resetButton = document.getElementById("resetButton");
  const shareButton = document.getElementById("shareButton");
  const copyButton = document.getElementById("copyButton");
  const appTitle = document.getElementById("app-title");
  const resultTitle = document.getElementById("resultTitle");

  appTitle.textContent = window.APP_CONFIG.APP_NAME;
  resultTitle.textContent = "\u4eca\u56de\u306e\u6b63\u5f53\u5316";
  document.querySelector(".eyebrow").textContent = "TUNING PARTS REVIEW";
  document.querySelector(".stamp").textContent = "\u30ec\u30d3\u30e5\u30fc";
  shareButton.textContent = "\u3053\u306e\u6b63\u5f53\u5316\u3092\u30b7\u30a7\u30a2";
  document.title = window.APP_CONFIG.APP_NAME;

  function setMessage(element, text, type) {
    element.textContent = text;
    element.className = type ? `${element.className.split(" ")[0]} ${type}` : element.className.split(" ")[0];
  }

  async function refreshClassificationAliases() {
    if (!window.TuningSupabase.hasSupabaseConfig) return;
    try {
      const aliases = await window.TuningSupabase.fetchPublicAliases();
      window.TuningClassifier.setLearnedAliases(aliases);
    } catch (error) {
      // Classification can continue with the built-in dictionary if synchronization fails.
      console.warn("Classification aliases could not be refreshed.", error);
    }
  }

  function clearMessage(element) {
    element.textContent = "";
    element.className = element.className.split(" ")[0];
  }

  function validateInput(productText, disappointmentText) {
    if (productText.length < 2 || productText.length > 100) {
      return "メーカー・パーツ名は2〜100文字で入力してください。";
    }
    if (disappointmentText.length < 2 || disappointmentText.length > 300) {
      return "残念だった点は2〜300文字で入力してください。";
    }
    return "";
  }

  function getPunchLine(text) {
    const sentences = text.split("。").map((item) => item.trim()).filter(Boolean);
    return sentences[sentences.length - 1] ? `${sentences[sentences.length - 1]}。` : text;
  }

  function createAnonymousId() {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (character) {
      const random = Math.floor(Math.random() * 16);
      const value = character === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
    });
  }

  function getAnonymousId() {
    try {
      let id = window.localStorage.getItem(visitorStorageKey);
      if (!id) {
        id = createAnonymousId();
        window.localStorage.setItem(visitorStorageKey, id);
      }
      return id;
    } catch (error) {
      return createAnonymousId();
    }
  }

  function renderResult(productText, disappointmentText, result) {
    resultProduct.textContent = productText;
    resultDisappointment.textContent = disappointmentText;
    resultText.textContent = result.generatedText;
    specificityHint.hidden = !result.showSpecificityHint;
    safetyWarning.hidden = !result.safetyWarning;
    resultSection.classList.remove("hidden");
    resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    clearMessage(formMessage);
    clearMessage(resultMessage);

    const productText = productInput.value.trim();
    const disappointmentText = disappointmentInput.value.trim();

    if (honeypotInput.value.trim()) {
      setMessage(formMessage, "入力を受け付けました。", "success");
      return;
    }

    if (Date.now() < cooldownUntil) {
      const remaining = Math.ceil((cooldownUntil - Date.now()) / 1000);
      setMessage(formMessage, `少しだけ時間をあけてください。あと${remaining}秒ほどです。`, "error");
      return;
    }

    const validationError = validateInput(productText, disappointmentText);
    if (validationError) {
      setMessage(formMessage, validationError, "error");
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "正当化を生成中...";

    await refreshClassificationAliases();
    const result = window.TuningGenerator.generateJustification(productText, disappointmentText);
    latestResult = {
      productText,
      disappointmentText,
      generatedText: result.generatedText,
      punchLine: getPunchLine(result.generatedText),
      safetyWarning: result.safetyWarning,
      variantIndex: result.variantIndex,
      ruleKey: result.ruleKey
    };

    try {
      if (window.TuningSupabase.hasSupabaseConfig) {
        const saveResult = await window.TuningSupabase.insertRegret({
          product_text: productText,
          disappointment_text: disappointmentText,
          manufacturer_name: window.TuningClassifier.classifyManufacturer(productText),
          part_category: result.partCategory,
          complaint_category: result.complaintCategory,
          justification_type: result.ruleKey === "fallback" ? "generic" : "specific",
          visitor_id: getAnonymousId(),
          product_normalized: window.TuningClassifier.normalizeForDedup(productText) || window.TuningClassifier.normalize(productText),
          disappointment_normalized: window.TuningClassifier.normalizeForDedup(disappointmentText) || window.TuningClassifier.normalize(disappointmentText)
        });
        if (saveResult.duplicate) {
          setMessage(resultMessage, "同じ内容はすでに記録済みです。正当化は何度でも楽しめます。", "success");
        } else {
          setMessage(resultMessage, "正当化しました。", "success");
        }
      } else {
        throw new Error("Supabase is not configured.");
      }
    } catch (error) {
      console.error("Failed to save record.", error);
      setMessage(resultMessage, "正当化には成功しました。記録だけ少し失敗したようです。", "error");
    } finally {
      renderResult(productText, disappointmentText, result);
      cooldownUntil = Date.now() + cooldownMs;
      submitButton.disabled = false;
      submitButton.textContent = "この後悔を正当化する";
    }
  }

  async function handleShare() {
    if (!latestResult) {
      return;
    }

    clearMessage(resultMessage);

    try {
      const shareResult = await window.TuningShare.shareResult(latestResult);
      if (shareResult.mode === "copy") {
        setMessage(resultMessage, "シェア機能が使えなかったため、文章をコピーしました。", "success");
      } else if (shareResult.mode === "share") {
        setMessage(resultMessage, "共有シートを開きました。", "success");
      }
    } catch (error) {
      console.error("Failed to share.", error);
      setMessage(resultMessage, "共有に失敗しました。もう一度試してください。", "error");
    }
  }

  async function handleCopy() {
    if (!latestResult) {
      return;
    }

    try {
      const text = [
        `【${window.APP_CONFIG.APP_NAME}】`,
        `メーカー・パーツ名: ${latestResult.productText}`,
        `残念だった点: ${latestResult.disappointmentText}`,
        latestResult.generatedText
      ].join("\n");
      await window.TuningShare.copyText(text);
      setMessage(resultMessage, "結果をコピーしました。", "success");
    } catch (error) {
      console.error("Failed to copy.", error);
      setMessage(resultMessage, "コピーに失敗しました。", "error");
    }
  }

  function handleAlternate() {
    if (!latestResult) {
      return;
    }

    const result = window.TuningGenerator.generateJustification(
      latestResult.productText,
      latestResult.disappointmentText,
      { excludeVariantIndex: latestResult.variantIndex }
    );

    latestResult.generatedText = result.generatedText;
    latestResult.punchLine = getPunchLine(result.generatedText);
    latestResult.safetyWarning = result.safetyWarning;
    latestResult.variantIndex = result.variantIndex;
    latestResult.ruleKey = result.ruleKey;
    renderResult(latestResult.productText, latestResult.disappointmentText, result);
    setMessage(resultMessage, "別の正当化を表示しました。", "success");
  }

  function handleReset() {
    form.reset();
    clearMessage(formMessage);
    clearMessage(resultMessage);
    resultSection.classList.add("hidden");
    productInput.focus();
  }

  form.addEventListener("submit", handleSubmit);
  alternateButton.addEventListener("click", handleAlternate);
  shareButton.addEventListener("click", handleShare);
  copyButton.addEventListener("click", handleCopy);
  resetButton.addEventListener("click", handleReset);

  if (window.TuningSupabase.hasSupabaseConfig) {
    refreshClassificationAliases();
  }
})();
