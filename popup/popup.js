console.log("Popup script loaded");

document.addEventListener("DOMContentLoaded", () => {
  // Show site hostname
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs[0]?.url?.startsWith("http")) return;

    const url = new URL(tabs[0].url);
    const siteEl = document.getElementById("site");
    if (siteEl) siteEl.textContent = url.hostname;
  });

  // Button click
  const summarizeBtn = document.getElementById("summarizeButton");

  if (!summarizeBtn) {
    console.warn("summarizeButton not found");
    return;
  }

  summarizeBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: "GET_PAGE_TEXT" },
        (response) => {
          console.log("Popup received page text:", response?.text);
        }
      );
    });
  });
});
