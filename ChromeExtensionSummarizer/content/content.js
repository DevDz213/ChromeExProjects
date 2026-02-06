function extractText() {
  const article = document.querySelector("article");
  const main = document.querySelector("main");

  const target = article || main || document.body;
  return target.innerText;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log("Received message in content script:", msg);
  if (msg.type === "GET_PAGE_TEXT") {
    sendResponse({ text: extractText() });
    console.log("Sent page text to popup");
  }
});
