# Roteiro - Login


### 1. Instale as dependências necessárias:

```bash
$ npm install firebaseui --save

```

### 2. Crie um arquivo na pasta src para a configuração do Firebase (firebase.ts)

Para encontrar as informações necessárias para configurar o Firebase em seu projeto, siga estes passos:

1. Acesse o Console do Firebase ([https://console.firebase.google.com/](https://console.firebase.google.com/)) e faça login com sua conta Google.
2. Crie um novo projeto ou selecione um projeto existente.
3. No painel esquerdo, clique em "Configurações do projeto" (ícone de engrenagem).
4. Na aba "Geral", role para baixo até a seção "Seus aplicativos".
5. Clique no botão "</>" para adicionar um novo aplicativo web, se ainda não tiver um.
6. Dê um nome ao seu aplicativo e clique em "Registrar aplicativo".
7. Você verá um objeto de configuração semelhante ao do exemplo. Copie essas informações para o seu arquivo firebase.ts.

Lembre-se de nunca compartilhar publicamente essas informações de configuração, especialmente a apiKey, pois elas são específicas do seu projeto.

```jsx

const firebaseConfig = {
  apiKey: 'SUA_API_KEY',
  authDomain: 'SEU_AUTH_DOMAIN',
  projectId: 'SEU_PROJECT_ID',
  storageBucket: 'SEU_STORAGE_BUCKET',
  messagingSenderId: 'SEU_MESSAGING_SENDER_ID',
  appId: 'SEU_APP_ID'
};

export default firebaseConfig**;**
```

### 2. Inicialize o firebase, no arquivo index.tsx:

Para inicializar o Firebase no seu aplicativo React, siga estas etapas:


```jsx
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: 'SUA_API_KEY',
  authDomain: 'SEU_AUTH_DOMAIN',
  projectId: 'SEU_PROJECT_ID',
  storageBucket: 'SEU_STORAGE_BUCKET',
  messagingSenderId: 'SEU_MESSAGING_SENDER_ID',
  appId: 'SEU_APP_ID'
};
export const app = initializeApp(firebaseConfig) ;
...

```

1. Vamos criar a página de login, crie um novo Componente na pasta componentes (src/pages/Login.page.tsx):

```jsx
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
	    const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password).then(
        ( userCredential ) => {
            const user = userCredential.user;
            console.log ( user ) ;
        }).catch (
            ( error ) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log (errorCode ) ;
                console.log ( errorMessage ) ;
        });
    } catch (err) {
      setError('Erro ao fazer login: ' + err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;

```

### 4. No componente index.tsx, vamos incluir uma nova rota para a página de login:

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home.page';
import BookForm from './pages/BookForm.page';
import { IBook } from './interfaces/IBook.interface';
import BookList from './pages/BookList.page';

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: 'SUA_API_KEY',
  authDomain: 'SEU_AUTH_DOMAIN',
  projectId: 'SEU_PROJECT_ID',
  storageBucket: 'SEU_STORAGE_BUCKET',
  messagingSenderId: 'SEU_MESSAGING_SENDER_ID',
  appId: 'SEU_APP_ID'
};
export const app = initializeApp(firebaseConfig) ;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/create" element={<BookForm onAddBook={(book: IBook): void => {}} />} />
        <Route path='/books/list' element={<BookList books={[]} />} />
        <Route path='/login' element= {<LoginPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
```
# Salvando dados no firestore
No arquivo de BookForm.page.tsx

```tsx
import React, { useState } from 'react';
import { IBook } from '../interfaces/IBook.interface'
import useForm from '../hooks/useForm';
import { doc, setDoc } from "firebase/firestore"; 

// Importar o app do index
const db = getFirestore(app);

interface BookFormProps {
    onAddBook: (book: IBook) => void;
}

const BookForm = ({ onAddBook }: BookFormProps) => {
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [year, setYear] = useState<number>();

    const { validate } = useForm();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { errors, hasErrors} = validate({
            id: 0,
            title,
            author,
            year
        })
        
        if (!hasErrors) {
            const newBook: IBook = {
                id: Date.now(),
                title,
                author,
                year: Number(year),
            };
            await setDoc(doc(db, "books", id), {
		  title,
		  author,
		  year
		});
            onAddBook(newBook);
            setTitle('');
            setAuthor('');
            setYear(undefined);
        }
    };

   ...
```



