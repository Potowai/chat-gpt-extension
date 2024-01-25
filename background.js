const isChrome = typeof chrome !== "undefined";
const tabs = isChrome ? chrome.tabs : browser.tabs;
const runtime = isChrome ? chrome.runtime : browser.runtime;

let chatGptTab;

runtime.onInstalled.addListener(() => {
  console.log("Extension installed");
});

runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.chatGPTDone) {
    tabs.update(sender.tab.id, { active: true });
    sendResponse({ status: "Notification shown" });
  }

  if (request.getActiveTab) {
    setChatGptTab();
  }

  if (request.setActiveTab) {
    tabs.update(chatGptTab.id, { active: true }, () => {
      console.log(`Switched back to ChatGPT Tab`);
    });
  }

  return true;
});

function setChatGptTab() {
  tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      chatGptTab = tabs[0];
    }
  });
}
