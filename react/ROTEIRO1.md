# Roteiro: Introdução ao React

# **Ambiente de desenvolvimento local**

Certifique-se de ter uma versão recente do [Node.js](https://nodejs.org/pt-br/) instalada.

<aside>
💡

Turbinando o vscode
- Dica 1 — Color HightLight
- Dica 2 — Dracula Official
- Dica 3 — Path Intellisense
- Dica 4 — VsCode-icons
- Dica 5 — Prettier
- Dica 6 - React Component Generator

</aside>

# Criação do projeto

```bash
npx create-react-app <nome-do-projeto> --template typescript
```
```
cd nome-do-projeto
npm install --save typescript
npm install --save @types/node
npm install --save @types/react
npm install --save @types/react-dom
npm install --save @types/jest
```

```bash
cd nome-do-projeto
npm start
```

1. Apague as informações que vem por padrão:

No arquivo `src/App.tsx` ficara assim:

```tsx

import './App.css';

function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;

```

1. Remova todo o css dos arquivos`index.css` e `App.css` , na pasta`src/`
2. Remova o arquivo `App.test.tsx` na pasta`src/`
3. O arquivo  `index.tsx` na pasta `src/` deverá ficar assim:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();

```

# **Developer Tools -** Extensão

A extensão React Devtools para [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) e [Firefox](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) permite inspecionar uma árvore de componentes React com as ferramentas de desenvolvedor do seu navegador.

![](https://pt-br.legacy.reactjs.org/static/41330fe61a925e2c3009be675bdb96a9/f2205/devtools.png)

O React DevTools permite que você verifique as props e o estado (*state*) de seus componentes React.

<aside>
💡

- Extenção para Chrome: [https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) React Developer Tools
- Extenção para Firefox: [https://addons.mozilla.org/en-US/firefox/addon/react-devtools/](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/) - React Developer Tools
- Edge [https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil](https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil) - React Developer Tools
- Safari e outros navegadores: npm install -g  react-devtools
</aside>

# Seu primeiro componente

- Crie uma pasta dentro de `src/` com o nome `components` . Dentro dessa pasta crie um arquivo chamado `profile.component.tsx`
    
    ```tsx
    const Profile = () => {
      return (
        <img
          src="https://i.imgur.com/MK3eW3Am.jpg"
          alt="Katherine Johnson"
        />
      )
    }
    
    export default Profile
    ```
    
- Usando seu componente:
    
    No arquivo `src/App.tsx`
    
    ```tsx
    import Profile from './components/profile'
    import './App.css';
    
    function App() {
      return (
        <div className="App">
    	    <Profile />
          <Profile />
          <Profile />
        </div>
      );
    }
    
    export default App;
    ```
    
- Propriedades de um componente:
    
    
    ```tsx
    interface ProfileProps {
      name: string;
      imageUrl: string;
    }
    
    const Profile = ({ name, imageUrl }: ProfileProps) => {
      return (
        <div>
          <img src={imageUrl} alt={name} />
          <h2>{name}</h2>
        </div>
      )
    }
    
    export default Profile;
    ```
    
    Agora, vamos modificar nosso componente App para usar este componente Profile com propriedades:
    
    ```tsx
    import Profile from './components/profile'
    import './App.css';
    
    function App() {
      return (
        <div className="App">
          <Profile
    	      name="Katherine Johnson"
    	      imageUrl="https://i.imgur.com/MK3eW3Am.jpg" />
          <Profile
    	      name="Dorothy Vaughan"
    	      imageUrl="https://i.imgur.com/7vQD0fPs.jpg" />
          <Profile
    	      name="Mary Jackson"
    	      imageUrl="https://i.imgur.com/Z9SnKhp.jpg" />
        </div>
      );
    }
    
    export default App;
    ```
    
    Desta forma, estamos passando diferentes nomes e URLs de imagem para cada instância do componente Profile, demonstrando como as props podem ser usadas para personalizar componentes reutilizáveis.
    

# Instalar React Router para Navegação

Vamos usar o [https://reactrouter.com/](https://reactrouter.com/) para navegação do site.

Para instalar o React Router em seu projeto, você pode usar o seguinte comando:

```bash
npm install react-router-dom
```

- Configuração de rotas:
    - Primeiro vamos criar a página home:
        - Em  `src` crie a pasta `pages`  e dentro da pasta o arquivo `home.page.tsx`
        
        ```tsx
        import Profile from './components/profile'
        import './App.css';
        
        const HomePage = () => {
          return (
            <div className="App">
              <Profile
        	      name="Katherine Johnson"
        	      imageUrl="https://i.imgur.com/MK3eW3Am.jpg" />
              <Profile
        	      name="Dorothy Vaughan"
        		    imageUrl="https://i.imgur.com/7vQD0fPs.jpg" />
              <Profile
        	      name="Mary Jackson"
        	      imageUrl="https://i.imgur.com/Z9SnKhp.jpg" />
            </div>
          );
        }
        
        export default HomePage;
        ```
        
    - No arquivo `src/App.tsx`
    
    ```tsx
    import React from 'react';
    import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
    import HomePage from './pages/home.page';
    
    const App = () => {
      return (
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Router>
      );
    };
    
    export default App;
    ```
    

Criado por: Eliane Faveron Maciel
