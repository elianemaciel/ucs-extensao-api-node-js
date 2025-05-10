# Roteiro - Formulários


---

### Passo 1: Criando o Tipo do Livro

1. Dentro da pasta `src`, crie uma pasta de nome `interfaces`, dentro dela crie o arquivo `IBook.interface.ts` para definir o tipo do livro.
    
    ```tsx
    
    export interface IBook {
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
    import { IBook } from '../interfaces/IBook.interface';
    
    interface BookFormProps {
        onAddBook: (book: Book) => void;
    }
    
    const BookForm = ({ onAddBook }: BookFormProps) => {
        const [title, setTitle] = useState('');
        const [author, setAuthor] = useState('');
        const [year, setYear] = useState<number | ''>('');
    
        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            if (title && author && year) {
                const newBook: IBook = {
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
    import { IBook } from '../interfaces/IBook.interface';

    
    interface BookListProps {
        books: IBook[];
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
## Integração com Tailwind

```
npm install tailwindcss @tailwindcss/cli
```
- Add the @import "tailwindcss"; import to your main CSS file.
```npx @tailwindcss/cli -i ./src/input.css -o ./src/output.css --watch```
- Add your compiled CSS file to the <head> and start using Tailwind’s utility classes to style your content.
```npx flowbite-react@latest init```
