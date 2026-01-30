console.log("Popup script loaded");

function displaySummary(summary) {
  const existingSummary = document.getElementById("summary");
  if (!existingSummary) {
    existingSummary = document.createElement("div");
    existingSummary.id = "summary";
  }
  
  existingSummary.textContent = summary;
  document.body.appendChild(existingSummary);
}

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
          // Call Flask backend
          fetch('http://localhost:5000/summarize', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ text: response.text })
          })
          .then(response => response.json())
          .then(data => displaySummary(data.summary))
          .catch(error => console.log("Error:", error.message));
          return true; // Keep channel open for async response
        }
      );
    });
  });
});
