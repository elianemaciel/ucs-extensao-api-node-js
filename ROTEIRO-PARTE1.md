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
   nest generate module accounts
   nest generate controller accounts
   nest generate service accounts
   ```

3. **Configure o serviço de contas (`accounts/accounts.service.ts`):**

   ```typescript
   import { Injectable } from '@nestjs/common';

   @Injectable()
   export class AccountsService {
     constructor(
     ) {}

     create(conta: any)  {}

     findAll()  {}

     findOne(id: number)  {}

     async update(id: number, conta: any)  {}

     async remove(id: number)  {}
   }
   ```

4. **Configure o controlador de contas (`accounts/accounts.controller.ts`):**

   ```typescript
   import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
   import { AccountsService } from './accounts.service';

   @Controller('accounts')
   export class AccountsController {
     constructor(private readonly accountsService: AccountsService) {}

     @Post()
     create(@Body() conta: any) {
       return this.accountsService.create(conta);
     }

     @Get('all')
     findAll() {
       return this.accountsService.findAll();
     }

     @Get(':id')
     findOne(@Param('id') id: number) {
       return this.accountsService.findOne(id);
     }

     @Put(':id')
     update(@Param('id') id: number, @Body() conta: any) {
       return this.accountsService.update(id, conta);
     }

     @Delete(':id')
     remove(@Param('id') id: number) {
       return this.accountsService.remove(id);
     }
   }
   ```

### 4. Testando o CRUD

1. **Inicie a aplicação:**

   ```bash
   npm run start
   ```

2. **Testes:**

   Use ferramentas como Postman ou cURL para testar os endpoints:

   - **POST** `/accounts` para criar uma nova conta.
   - **GET** `/accounts` para listar todas as contas.
   - **GET** `/accounts/:id` para buscar um conta pelo ID.
   - **PUT** `/accounts/:id` para atualizar um conta pelo ID.
   - **DELETE** `/accounts/:id` para remover um conta pelo ID.

### 5. Criando o módulo clientes:

1. **Crie um módulo, controlador e serviço para Cliente:**

   ```bash
   nest generate module clientes
   nest generate controller clientes
   nest generate service clientes
   ```
2. **Crie os métodos (Get, Post, Put, Delete) para o Controller Cliente**
