Roteiro CRUD (Create, Read, Update, Delete) usando NestJS.
O NestJS é um framework para construir aplicações Node.js eficientes e escaláveis.
Vou assumir que você já tem o Node.js e o NestJS CLI instalados. Se não, você pode instalar o NestJS CLI com `npm install -g @nestjs/cli`.

Vamos criar uma aplicação CRUD para gerenciar um recurso chamado "Produto".

### 1. Configuração Inicial

1. **Crie um novo projeto NestJS:**

   ```bash
   nest new <nome-do-projeto>
   ```

2. **Instale as dependências necessárias:**

   Para este exemplo, vamos usar o TypeORM para interagir com um banco de dados SQL. Você pode usar o PostgreSQL, MySQL, SQLite, etc.

   ```bash
   cd <nome-do-projeto>
   ```


### 2. Criação do Módulo de Produtos

1. **Crie um módulo, controlador e serviço para produtos:**

   ```bash
   nest generate module produtos
   nest generate controller produtos
   nest generate service produtos
   ```

2. **Defina a entidade `Produto` (`produtos/produto.entity.ts`):**

   ```typescript
   import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

   @Entity()
   export class Produto {
     @PrimaryGeneratedColumn()
     id: number;

     @Column()
     nome: string;

     @Column()
     preco: number;
   }
   ```

3. **Configure o serviço de produtos (`produtos/produtos.service.ts`):**

   ```typescript
   import { Injectable } from '@nestjs/common';
   import { InjectRepository } from '@nestjs/typeorm';
   import { Repository } from 'typeorm';
   import { Produto } from './produto.entity';

   @Injectable()
   export class ProdutosService {
     constructor(
       @InjectRepository(Produto)
       private readonly produtoRepository: Repository<Produto>,
     ) {}

     create(produto: Partial<Produto>): Promise<Produto> {
       return this.produtoRepository.save(produto);
     }

     findAll(): Promise<Produto[]> {
       return this.produtoRepository.find();
     }

     findOne(id: number): Promise<Produto> {
       return this.produtoRepository.findOneBy({ id });
     }

     async update(id: number, produto: Partial<Produto>): Promise<Produto> {
       await this.produtoRepository.update(id, produto);
       return this.produtoRepository.findOneBy({ id });
     }

     async remove(id: number): Promise<void> {
       await this.produtoRepository.delete(id);
     }
   }
   ```

4. **Configure o controlador de produtos (`produtos/produtos.controller.ts`):**

   ```typescript
   import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
   import { ProdutosService } from './produtos.service';
   import { Produto } from './produto.entity';

   @Controller('produtos')
   export class ProdutosController {
     constructor(private readonly produtosService: ProdutosService) {}

     @Post()
     create(@Body() produto: Partial<Produto>) {
       return this.produtosService.create(produto);
     }

     @Get()
     findAll() {
       return this.produtosService.findAll();
     }

     @Get(':id')
     findOne(@Param('id') id: number) {
       return this.produtosService.findOne(id);
     }

     @Put(':id')
     update(@Param('id') id: number, @Body() produto: Partial<Produto>) {
       return this.produtosService.update(id, produto);
     }

     @Delete(':id')
     remove(@Param('id') id: number) {
       return this.produtosService.remove(id);
     }
   }
   ```

5. **Atualize o módulo de produtos (`produtos/produtos.module.ts`):**

   ```typescript
   import { Module } from '@nestjs/common';
   import { TypeOrmModule } from '@nestjs/typeorm';
   import { ProdutosController } from './produtos.controller';
   import { ProdutosService } from './produtos.service';
   import { Produto } from './produto.entity';

   @Module({
     imports: [TypeOrmModule.forFeature([Produto])],
     controllers: [ProdutosController],
     providers: [ProdutosService],
   })
   export class ProdutosModule {}
   ```

### 4. Testando o CRUD

1. **Inicie a aplicação:**

   ```bash
   npm run start
   ```

2. **Testes:**

   Use ferramentas como Postman ou cURL para testar os endpoints:

   - **POST** `/produtos` para criar um novo produto.
   - **GET** `/produtos` para listar todos os produtos.
   - **GET** `/produtos/:id` para buscar um produto pelo ID.
   - **PUT** `/produtos/:id` para atualizar um produto pelo ID.
   - **DELETE** `/produtos/:id` para remover um produto pelo ID.

E isso é o básico de um CRUD com NestJS! Dependendo das suas necessidades, você pode adicionar validação, autenticação, e outras funcionalidades. Se precisar de mais alguma coisa ou tiver dúvidas, só avisar!
