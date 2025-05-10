# Roteiro - Formulários


---

### Passo 1: Criando o Tipo do Livro

1. Dentro da pasta `src`, crie uma pasta de nome `interfaces`, dentro dela crie o arquivo `book.interface.ts` para definir o tipo do livro.
    
    ```tsx
    
    export interface Book {
        id: number;
        title: string;
        author: string;
        year: number;
    }
    
    ```

---

### Passo 2: Criando o Formulário de Cadastro

1. Dentro de `src/pages`, crie um arquivo `BookForm.page.tsx` para o formulário de cadastro de livros.
    
    ```tsx
    import React, { useState } from 'react';
    import { Book } from '../interfaces/book.interface';
    
    interface BookFormProps {
        onAddBook: (book: Book) => void;
    }
    
    const BookForm = ({ onAddBook }) => {
        const [title, setTitle] = useState('');
        const [author, setAuthor] = useState('');
        const [year, setYear] = useState<number | ''>('');
    
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            if (title && author && year) {
                const newBook: Book = {
                    id: Date.now(),
                    title,
                    author,
                    year: Number(year),
                };
                onAddBook(newBook);
                setTitle('');
                setAuthor('');
                setYear('');
            }
        };
    
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Título:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="author">Autor:</label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="year">Ano:</label>
                    <input
                        type="number"
                        id="year"
                        value={year}
                        onChange={(e) => setYear(e.target.valueAsNumber || '')}
                        required
                    />
                </div>
                <button type="submit">Cadastrar Livro</button>
            </form>
        );
    };
    
    export default BookForm;
    
    ```


### Passo 3: Listando os Livros

1. Dentro de `src/pages`, crie um arquivo `BookList.page.tsx` para exibir a lista de livros cadastrados.
    
    ```tsx
    
    import React from 'react';
    import { Book } from './interfaces/book.interface';
    
    interface BookListProps {
        books: Book[];
    }
    
    const BookList = ({ books }: BookListProps) => {
        return (
            <div>
                <h2>Lista de Livros</h2>
                <ul>
                    {books.map((book) => (
                        <li key={book.id}>
                            <strong>{book.title}</strong> - {book.author} ({book.year})
                        </li>
                    ))}
                </ul>
            </div>
        );
    };
    
    export default BookList;
    
    ```
    

---

### Passo 5: Crie as routes para cada pagina

1. Altere o componente `Principal.tsx` criado no último roteiro. Importe os componentes `BookForm` e `BookList` e implemente a lógica de adicionar e listar os livros.
    
    ```tsx
    
    import React, { useState } from 'react';
    import BookForm from './BookForm';
    import BookList from './BookList';
    import { Book } from './types';
    
    const Principal = () => {
        const [books, setBooks] = useState<Book[]>([]);
    
        const addBook = (book: Book) => {
            setBooks((prevBooks) => [...prevBooks, book]);
        };
    
        return (
            <div className="App">
                <h1>Cadastro de Livros</h1>
                <BookForm onAddBook={addBook} />
                <BookList books={books} />
            </div>
        );
    };
    
    export default Principal;
    
    ```
    

# Validação de Formulário com Hook Personalizado em React


### 🔧 Hook `useForm` 
Crie um arquivo useForm.tsx dentro de uma pasta de nome hooks.

```jsx
import { useState } from 'react';

function useForm(validate) {
  const [errors, setErrors] = useState({});

  function validate(values) {
    const errors = {};
    if (!values.name) {
      errors.name = "O nome é obrigatório";
    }
    if (!values.email) {
      errors.email = "O e-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "E-mail inválido";
    }
    return errors;
 }
  return { validate };
}
```

