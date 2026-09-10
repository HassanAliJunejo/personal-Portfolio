import gradio as gr
import uvicorn

from main import app

with gr.Blocks(title="Portfolio Backend") as demo:
    gr.Markdown(
        "# Portfolio Backend\n"
        "FastAPI chat API for Hassan Ali Junejo's portfolio.\n\n"
        "- `POST /api/chat` — chat with the portfolio assistant\n"
        "- `GET /api/history/{session_id}` — conversation history\n"
        "- `GET /` — health check"
    )

app = gr.mount_gradio_app(app, demo, path="/ui")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=7860)
