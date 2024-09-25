document.getElementById('download-btn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
      // Inject the injectScripts.js content script
      chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ['injectScripts.js'],
      });
  });
});