from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import ollama
import json

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class PassageRequest(BaseModel):
    highlight: str
    context: str

@app.post("/generate_card")
def generate_card(req: PassageRequest):
    prompt = f"""Given this passage and a highlighted portion, produce ONE atomic flashcard as a question and answer, focused specifically on the highlighted fact.
    Passage: {req.context}
    Highlight: {req.highlight}
    Rules: minimum information principle, no compound facts, question must be unambiguous without seeing the passage.
    Output JSON: {{"question": "...", "answer": "..."}}
    """
    response = ollama.chat(
        model="qwen3:4b",
        messages=[{"role": "user", "content": prompt}],
        format="json",
        keep_alive="30m",
        think=False,
        options={"num_predict": 300}
    )
    return json.loads(response["message"]["content"])
