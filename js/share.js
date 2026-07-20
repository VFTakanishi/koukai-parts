(function () {
  function getShareUrl() {
    const configuredUrl = (window.APP_CONFIG && window.APP_CONFIG.PUBLIC_SITE_URL) || "";
    if (!configuredUrl || configuredUrl.includes("localhost")) {
      return window.location.href;
    }
    return configuredUrl;
  }

  function buildShareText(result) {
    const siteUrl = getShareUrl();
    return [
      `${result.productText}が「${result.disappointmentText}」だった件を、無理やり正当化してもらいました。`,
      "",
      `「${result.punchLine}」`,
      "",
      "あなたの後悔パーツも正当化できます。",
      `${siteUrl}`,
      "#チューニングパーツ正当化"
    ].join("\n");
  }

  async function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }

  async function shareResult(result) {
    const text = buildShareText(result);
    const shareData = {
      title: `${window.APP_CONFIG.APP_NAME}の正当化`,
      text,
      url: getShareUrl()
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return { mode: "share", text };
      } catch (error) {
        if (error && error.name === "AbortError") {
          return { mode: "cancel", text };
        }
      }
    }

    await copyText(text);
    return { mode: "copy", text };
  }

  window.TuningShare = {
    buildShareText,
    copyText,
    shareResult
  };
})();
