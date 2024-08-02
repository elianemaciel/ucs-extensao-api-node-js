### DEPLOY

#### Crie o arquivo de configuração

vercel.json

```json
{ 
  "versão" :  2 , 
  "compilações" :  [ 
    { 
      "origem" :  "src/main.ts" , 
      "uso" :  "@vercel/node" 
    } 
  ] , 
  "rotas" :  [ 
    { 
      "origem" :  "/(.*)" , 
      "destino" :  "src/main.ts" , 
      "métodos" :  [ "OBTER" ,  "POST" ,  "COLOCAR" ,  "EXCLUIR" ] 
    } 
  ] 
}
```

#### Instalando o vercel CLI

```bash
  npm i -g vercel 
```

#### Logando no vercel CLI

```bash
  vercel login
```

#### Compilando a aplicação NestJS

```bash
  npm run build
```

#### Deployment

```bash
vercel --prod
```


### GitHub Actions:
Vamos criar nossa Ação criando um novo arquivo  .github/workflows/production.yaml:

```
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
      - uses: actions/checkout@v2
      - name: Install Vercel CLI
        run: npm install --global vercel@latest
      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
      - name: Build Project Artifacts
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      - name: Deploy Project Artifacts to Vercel
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }}

```

1. Recupere seu Token de Acesso Vercel
2. Dentro da sua pasta, execute `vercel link` para criar um novo projeto Vercel
3. Dentro da `.vercel` pasta gerada, salve o **projectId** e **orgId** do **project.json**
4. Dentro do GitHub, adicione VERCEL_TOKEN, VERCEL_ORG_ID, e VERCEL_PROJECT_ID como segredos.