document.addEventListener("mouseup", () => {
  const selection = window.getSelection();
  const text = selection?.toString().trim();
  if (!text) return;

  const context = selection.anchorNode?.parentElement?.innerText ?? text;
  browser.storage.local.set({ pendingSelection: { text, context } });
});
