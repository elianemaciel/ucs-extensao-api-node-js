Roteiro CRUD (Create, Read, Update, Delete) usando NestJS.

Instale o NestJS CLI com `npm install -g @nestjs/cli`.

Vamos criar uma aplicação CRUD para gerenciar um recurso chamado "Banco". Nele teremos um módulo de contas para criação e edição, e um módulo cliente.


### 1. Configuração Inicial

1. **Crie um novo projeto NestJS:**

   ```bash
   nest new <nome-do-projeto>
   ```


### 2. Criação do Módulo de Conta

1. **Crie um módulo, controlador e serviço para Conta:**

   ```bash
   nest generate module contas
   nest generate controller contas
   nest generate service contas
   ```

3. **Configure o serviço de contas (`contas/contas.service.ts`):**

   ```typescript
   import { Injectable } from '@nestjs/common';

   @Injectable()
   export class ContasService {
     constructor(
     ) {}

     create(conta: any)  {}

     findAll()  {}

     findOne(id: number)  {}

     async update(id: number, conta: any)  {}

     async remove(id: number)  {}
   }
   ```

4. **Configure o controlador de contas (`contas/contas.controller.ts`):**

   ```typescript
   import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
   import { ContasService } from './contas.service';

   @Controller('contas')
   export class ContasController {
     constructor(private readonly contasService: ContasService) {}

     @Post()
     create(@Body() conta: any) {
       return this.contasService.create(conta);
     }

     @Get()
     findAll() {
       return this.contasService.findAll();
     }

     @Get(':id')
     findOne(@Param('id') id: number) {
       return this.contasService.findOne(id);
     }

     @Put(':id')
     update(@Param('id') id: number, @Body() conta: any) {
       return this.contasService.update(id, conta);
     }

     @Delete(':id')
     remove(@Param('id') id: number) {
       return this.contasService.remove(id);
     }
   }
   ```

5. **Atualize o módulo de contas (`contas/contas.module.ts`):**

   ```typescript
   import { Module } from '@nestjs/common';
   import { ContasController } from './contas.controller';
   import { ContasService } from './contas.service';

   @Module({
     imports: [],
     controllers: [ContasController],
     providers: [ContasService],
   })
   export class ContasModule {}
   ```

### 4. Testando o CRUD

1. **Inicie a aplicação:**

   ```bash
   npm run start
   ```

2. **Testes:**

   Use ferramentas como Postman ou cURL para testar os endpoints:

   - **POST** `/contas` para criar uma nova conta.
   - **GET** `/contas` para listar todas as contas.
   - **GET** `/contas/:id` para buscar um conta pelo ID.
   - **PUT** `/contas/:id` para atualizar um conta pelo ID.
   - **DELETE** `/contas/:id` para remover um conta pelo ID.

### 5. Criando o módulo clientes:

1. **Crie um módulo, controlador e serviço para Cliente:**

   ```bash
   nest generate module clientes
   nest generate controller clientes
   nest generate service clientes
   ```
2. **Crie os métodos (Get, Post, Put, Delete) para o Controller Cliente**
