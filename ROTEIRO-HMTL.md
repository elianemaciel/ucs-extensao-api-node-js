### Roteiro para Criação de um Programa HTML

#### 1. **Configuração do Ambiente**
   - **Editor de Código**: Escolha um editor de código, como Visual Studio Code, Sublime Text, ou Atom.
   - **Estrutura de Pastas**:
     - `index.html`: Página principal.
     - `css/`: Para arquivos de estilo.
     - `js/`: Para scripts JavaScript.
     - `img/`: Para imagens.
     - `assets/`: Para fontes ou outros arquivos.

#### 2. **Criação do Arquivo HTML Básico**
   - **Início do Documento**:
     ```html
     <!DOCTYPE html>
     <html lang="pt-BR">
     <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Título da Página</title>
       <link rel="stylesheet" href="css/styles.css">
     </head>
     <body>
       <!-- Conteúdo da Página -->
     </body>
     </html>
     ```
   - **Cabeçalho (`<head>`)**:
     - Inclua a meta tag de charset, viewport e o título da página.
     - Links para arquivos CSS e outras bibliotecas, como Google Fonts.

#### 3. **Estrutura de Conteúdo**
   - **Cabeçalho (`<header>`)**:
     - Crie a barra de navegação, logotipo e links importantes.
     ```html
     <header>
       <nav>
         <ul>
           <li><a href="#home">Home</a></li>
           <li><a href="#about">Sobre</a></li>
           <li><a href="#contact">Contato</a></li>
         </ul>
       </nav>
     </header>
     ```
   - **Seções Principais (`<main>`)**:
     - Divida o conteúdo principal em seções, como Home, Sobre, Serviços, Contato.
     ```html
     <section id="home">
       <h1>Bem-vindo ao Meu Site</h1>
       <p>Descrição inicial...</p>
     </section>
     ```

   - **Rodapé (`<footer>`)**:
     - Adicione informações de contato, direitos autorais, e links de redes sociais.
     ```html
     <footer>
       <p>&copy; 2024 Meu Site. Todos os direitos reservados.</p>
     </footer>
     ```

#### 4. **Criação do Estilo (CSS)**
   - **Reset/Normalize**: Use um CSS reset para garantir consistência entre navegadores.
   - **Estilos Básicos**:
     - Defina as cores principais, fontes, e tamanhos básicos.
     - Layout responsivo utilizando `flexbox` ou `grid`.
     ```css
     body {
       font-family: Arial, sans-serif;
       color: #333;
       margin: 0;
       padding: 0;
     }

     header {
       background-color: #333;
       color: white;
       padding: 10px 0;
     }

     nav ul {
       display: flex;
       list-style: none;
       justify-content: space-around;
     }

     nav ul li a {
       color: white;
       text-decoration: none;
     }
     ```

