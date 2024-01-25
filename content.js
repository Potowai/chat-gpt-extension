const isChrome = typeof chrome !== "undefined";
const runtime = isChrome ? chrome.runtime : browser.runtime;

const messageInput = document.querySelector("textarea#prompt-textarea");
let sendButton = document.querySelector('button[data-testid="send-button"]');

sendButton.addEventListener("click", () => {
  startCheck();
});

function startCheck() {
  runtime.sendMessage({ getActiveTab: true });
  const intervalId = setInterval(() => {
    if (document.querySelector('button[data-testid="send-button"]')) {
      clearInterval(intervalId);
      sendButton = document.querySelector('button[data-testid="send-button"]');
      const audio = new Audio(runtime.getURL("notification2.mp3"));
      audio.play();
      runtime.sendMessage({ setActiveTab: true });
      runtime.sendMessage({ chatGPTDone: true });
    }
  }, 1000);
}

if (messageInput) {
  messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      startCheck();
    }
  });
} else {
  console.error("Message input not found");
}
