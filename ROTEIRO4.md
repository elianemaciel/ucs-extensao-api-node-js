# 📌 Deploy de uma aplicação NestJS na Vercel
Este tutorial guiará você no processo de deploy de uma aplicação NestJS usando a Vercel e como automatizar esse processo utilizando GitHub Actions.

## 🚀 1. Criando o arquivo de configuração vercel.json
Antes de fazer o deploy, precisamos configurar o Vercel para rodar nossa aplicação corretamente.

- 📄 Criar o arquivo vercel.json
Na raiz do projeto, crie um arquivo chamado vercel.json com o seguinte conteúdo:

```json
{ 
  "version": 2, 
  "builds": [ 
    { 
      "src": "src/main.ts", 
      "use": "@vercel/node" 
    } 
  ], 
  "routes": [ 
    { 
      "src": "/(.*)", 
      "dest": "src/main.ts", 
      "methods": ["GET", "POST", "PUT", "DELETE"] 
    } 
  ] 
}
```
- Explicação dos campos:

"version": 2 → Define a versão do sistema de builds da Vercel.

"builds" → Especifica o arquivo principal da aplicação NestJS (src/main.ts).

"routes" → Redireciona todas as requisições para src/main.ts, permitindo os métodos GET, POST, PUT e DELETE.

## 🔧 2. Instalando e configurando a Vercel CLI

Para realizar o deploy, precisamos da CLI da Vercel.

- 🛠 Instalar a CLI da Vercel
```bash
npm i -g vercel 
```

## 🔑 Fazer login na Vercel

```bash
vercel login
```

Isso abrirá um link para que você autentique sua conta na Vercel.

## 🔗 Vincular o projeto com a Vercel
Dentro do diretório do seu projeto, execute:

```bash
vercel link
```

Isso criará a pasta .vercel contendo o arquivo project.json com os identificadores do projeto.

## 🏗 3. Preparando a aplicação NestJS
Antes de fazer o deploy, compile a aplicação:

```bash
npm run build
```

## 🚀 4. Fazendo o Deploy

### 📤 Realizando o Deploy Manual
Para fazer um deploy manual, execute:

```bash
vercel --prod
```

# 🤖 Automação do Deploy com GitHub Actions
Vamos configurar o GitHub Actions para fazer deploy automaticamente sempre que houver um push na branch main.

## 📄 Criando o arquivo do GitHub Actions
Dentro do seu repositório, crie um arquivo chamado:

```bash
.github/workflows/production.yaml
```

### ✍ Conteúdo do arquivo production.yaml
```yaml
name: Vercel Production Deployment

env:
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}

on:
  push:
    branches:
      - main

jobs:
  Deploy-Production:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout do código
        uses: actions/checkout@v2

      - name: Instalar Vercel CLI
        run: npm install --global vercel@latest

      - name: Baixar variáveis de ambiente da Vercel
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}

      - name: Construir aplicação
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}

      - name: Fazer deploy para produção
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}
```

## 🔐 6. Configurando Segredos no GitHub
Precisamos definir variáveis de ambiente seguras no repositório do GitHub.

- 🌍 Recuperar identificadores do projeto
Dentro da pasta .vercel, abra o arquivo project.json e copie:

"orgId" → Esse será o VERCEL_ORG_ID

"projectId" → Esse será o VERCEL_PROJECT_ID

### 🛠 Criando os segredos no GitHub
Vá até o repositório no GitHub.

Acesse Settings (Configurações) > Secrets and variables > Actions.

Clique em New repository secret e adicione:

VERCEL_TOKEN → Pegue em https://vercel.com/account/tokens

VERCEL_ORG_ID → Copiado do arquivo project.json

VERCEL_PROJECT_ID → Copiado do arquivo project.json

