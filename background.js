browser.commands.onCommand.addListener((command) => {
  if (command === "generate-card") {
    browser.browserAction.openPopup();
  }
});
