FROM python:3.9

# Definir o diretório de trabalho
WORKDIR /app

# Copiar o arquivo requirements.txt
COPY requirements.txt .

# Instalar as dependências
RUN pip install --no-cache-dir -r requirements.txt

# Copiar o código-fonte da aplicação
COPY . .

# Expor a porta 8000
EXPOSE 8000

# Comando para executar o aplicativo
CMD ["uvicorn", "geminiwell:app", "--host", "0.0.0.0", "--port", "8000"]