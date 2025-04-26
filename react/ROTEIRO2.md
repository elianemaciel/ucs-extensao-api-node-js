# Estrutura do site

1. Crie um arquivo em **src/components/logo.component.tsx** conforme código abaixo:

```tsx
import React from "react";

const LogoComponent = () => {
  return (
    <a href="#">
      <h1 className="logo">
        <span>Projeto Exemplo</span>
      </h1>
    </a>
  );
};

export default LogoComponent;

```

1. Crie um elemento de navegação de menu: **src/componentes/nav.component.tsx**
    
    ```tsx
    import React from "react";
    
    const NavComponent = () => {
      return (
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Catálogo</a>
          </li>
        </ul>
      );
    };
    
    export default NavComponent;
    ```
    
2. Crie um componente para o Header, **src/componentes/header.component.tsx**

```jsx
// imports
const HeaderComponent = () => {
  return (
    <header className="topo">
      <LogoComponent />
      <NavComponent />
    </header>
  );
}

export default HeaderComponent;
```

1. Abra o arquivo **home.page.tsx** e inclua o novo componente:

```tsx
import React from "react";
// imports

const HomePage = () => {
  return (
    <main>
      <HeaderComponent />
      ... outros componentess
    </main>
  );
}

export default HomePage;
```

1. Agora crie um novo arquivo que será o nosso conteúdo principal: **src/components/main.component.tsx**

```tsx
import React from "react";
import Home from "./Home";
// imports

const MainComponent = () => {
  return (
    <main className="principal">
      <div className="App">
        <ProfileComponent
          name="Katherine Johnson"
          imageUrl="https://i.imgur.com/MK3eW3Am.jpg" />
        <ProfileComponent
          name="Dorothy Vaughan"
          imageUrl="https://i.imgur.com/7vQD0fPs.jpg" />
        <ProfileComponent
          name="Mary Jackson"
          imageUrl="https://i.imgur.com/Z9SnKhp.jpg" />
      </div>
    </main>
  );
};

export default MainComponent;
```

1. Abra o arquivo **home.page.tsx** e inclua o novo componente:

```tsx
import React from "react";
// imports

const HomePage = () => {
  return (
    <main>
      <HeaderComponent />
      <MainComponent />
    </main>
  );
}

export default HomePage;
```
