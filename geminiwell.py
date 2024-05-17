import os
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, responses
from starlette.staticfiles import StaticFiles
import json

import google.generativeai as genai

genai.configure(api_key=os.environ.get('GENAI_API_KEY'))

model = genai.GenerativeModel('gemini-pro')

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")

connections = []

@app.get("/")
async def get():
    with open("templates/index.html", "r") as file:
        html_content = file.read()
    return responses.HTMLResponse(content=html_content)


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connections.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            if data.strip():
                prompt = f"""
                Aborde essa pergunta em um texto curtos de no maximo 5 linhas com a sensibilidade de uma terapeuta ou psicóloga, faça parecer uma conversa.
                Segue a pergunta: {data}.          
                """
                response = model.generate_content(prompt)
                text_response = response.candidates[0].content.parts[0].text
                await websocket.send_text(text_response)
    except WebSocketDisconnect:
        connections.remove(websocket)
        await websocket.close()



# Executar o aplicativo FastAPI
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)