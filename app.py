import gradio as gr
import subprocess
import os

# Start the FastAPI server in the background
# We use nohup to keep it running
# The command assumes main:app is the FastAPI instance
process = subprocess.Popen(["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"])

# Create a dummy Gradio interface to satisfy the Space
def dummy_function():
    return "Backend is running!"

demo = gr.Interface(fn=dummy_function, inputs=[], outputs="text")

if __name__ == "__main__":
    demo.launch()
