async function generateCard(highlight, context) {
  const res = await fetch("http://localhost:8000/generate_card", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ highlight, context })
  });
  return await res.json();
}

async function main() {
  const { pendingSelection } = await browser.storage.local.get("pendingSelection");
  if (!pendingSelection) {
    document.getElementById("status").innerText = "No selection found.";
    return;
  }

  const card = await generateCard(pendingSelection.text, pendingSelection.context);

  document.getElementById("status").style.display = "none";
  document.getElementById("editor").style.display = "block";
  document.getElementById("question").value = card.question;
  document.getElementById("answer").value = card.answer;
}

document.getElementById("accept").addEventListener("click", () => {
  const question = document.getElementById("question").value;
  const answer = document.getElementById("answer").value;
  console.log("accepted:", { question, answer });
  window.close();
});

document.getElementById("reject").addEventListener("click", () => {
  window.close();
});

main();
