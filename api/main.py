from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SENHA_SECRETA = [3, 2, 5, 8]

@app.post("/api/verificar")
async def verificar_senha(request: Request):
    dados = await request.json()
    tentativa = [dados.get("num1"), dados.get("num2"), dados.get("num3"), dados.get("num4")]

    if tentativa == SENHA_SECRETA:
        return JSONResponse(content={"status": "sucesso", "mensagem": "🎉 Cofre Aberto!\n\nVocê torna a minha vida mil vezes melhor! Estar ao seu lado é como estar em casa. Quer ser meu lar por toda a vida? Bora me passar pro seu nome?"})
    else:
        return JSONResponse(content={"status": "erro", "mensagem": "❌ Senha Incorreta."})
