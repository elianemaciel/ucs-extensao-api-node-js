# Roteiro 2

## Parte 1 - Validação de dados nos endpoints

1. Instalar o Zod e o pacote de integração com NestJS

Execute o seguinte comando para instalar as dependências necessárias:

```bash
npm install zod nestjs-zod
```

2. Criar a Pasta dto/, dentro do módulo, e Adicionar os Schemas com Zod
📂 Estrutura do diretório:

```sql
src/
 ├── accounts/
 │   ├── dto/
 │   │   ├── create-account.dto.ts
 │   │   ├── update-account.dto.ts
```

2.1.  📌 Criando o create-conta.dto.ts

```typescript
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const CreateAccountSchema = z.object({
  number: z.number().int().positive(),
  holder: z.string().min(1, 'O titular é obrigatório'),
  balance: z.number().nonnegative(),
  limit: z.number().nonnegative(),
});

export class CreateAccountDto extends createZodDto(CreateAccountSchema) {}
```
2.2. 📌 Criando o update-conta.dto.ts
Usamos Zod para permitir que os campos sejam opcionais:

```typescript
import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const UpdateAccountSchema = z.object({
  number: z.number().int().positive().optional(),
  holder: z.string().min(1).optional(),
  balance: z.number().nonnegative().optional(),
  limit: z.number().nonnegative().optional(),
});

export class UpdateAccountDto extends createZodDto(UpdateAccountSchema) {}
```
3.  Utilizar os DTOs no Controller
Agora aplicamos a validação no Controller:
```typescript
import { Body, Controller, Post, Patch } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-conta.dto';
import { UpdateAccountDto } from './dto/update-conta.dto';

@Controller('contas')
export class ContaController {
  @Post()
  criarConta(@Body() createContaDto: CreateAccountDto) {
    return { message: 'Conta criada com sucesso!', data: createContaDto };
  }

  @Patch()
  atualizarConta(@Body() updateContaDto: UpdateAccountDto) {
    return { message: 'Conta atualizada com sucesso!', data: updateContaDto };
  }
}
```


## Parte 2 - Banco de dados:

1. Criar banco de dados:
[mongodb Atlas](https://www.mongodb.com/pt-br/cloud/atlas/register)


2. **Configurando o MongoDB**

   Para este exemplo, vamos usar o Mongoose para interagir com um banco de dados NoSQL.

   ```bash
   npm install --save @nestjs/mongoose mongoose
   ```

3. **Importando o mongoDB**:
  No modulo de **app** vamos importar o mongoose:
Substitua a URL com a url de conexão adquirida no MongoDB Atlas.

  ```typescript
    import { MongooseModule } from '@nestjs/mongoose';
  ```
   ```typescript
   ...
   @Module({
     imports: [
       MongooseModule.forRoot('mongodb://localhost/') // URL do seu banco de dados
     ],
     controllers: [AppController],
     providers: [AppService],
   })
   export class AppModule {}
   ```

4. **Construindo o Schema:**
  Vamos criar uma pasta chamada `schemas`, e crie um arquivo `contas.schema.ts`.

   ```typescript
    import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"

    @Schema({ collection: 'accounts' })
    export class Accounts {
      @Prop({ required: true })
      number: number;
      @Prop({ required: true })
      holder: string;
      @Prop({ required: true })
      balance: number;
      @Prop({ required: true })
      limit: number;
    }
    export const AccountsSchema = SchemaFactory.createForClass(Accounts)
   ```
    
5. **Adicionar em imports no modulo contas**:

```typescript
   import { MongooseModule } from '@nestjs/mongoose';
   import { Accounts, AccountsSchema } from 'src/schemas/accounts.schemas';
   ...
   @Module({
     imports: [MongooseModule.forFeature([{ name: Accounts.name, schema: AccountsSchema }])],
     controllers: [ContasController],
     providers: [ContasService],
     exports: [ContasModule]
   })
   export class ContasModule {}
   ```


6. **Configurando o Model/Service**

O arquivo do serviço é responsável pela interação e comunicação com o banco de dados MongoDB. Ele é usado para criar, recuperar, atualizar e excluir registros.
```typescript
...

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Accounts } from 'src/schemas/accounts.schemas';
import { Model } from 'mongoose';
import { CreateAccountDto } from './dto/create-account.dto'
import { UpdateAccountDto } from './dto/update-account.dto'

@Injectable()
export class AccountsService {
    constructor(
        @InjectModel(Accounts.name) private contaModel: Model<Accounts>
    ) {}
  
    create(conta: CreateAccountDto)  {
        const createdConta = new this.contaModel(conta);
        return createdConta.save();
      }
    
      findAll()  {
        return this.contaModel.find().exec();
      }
    
      findOne(numero: number)  {
        return this.contaModel.findOne({ numero: numero }).exec();
      }
    
      async update(id: number, account: UpdateAccountDto)  {
        const conta = await this.contaModel.findOneAndUpdate({ number: id }, account).exec();
        return conta
      }
    
      async remove(id: number)  {
        const conta = await this.contaModel.findOneAndDelete({ number: id }).exec();
        return conta
      }
}

```

### Parte 3

1. Instalação

```
npm i --save @nestjs/config
```

2. Importando o módulo:

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), AccountsModule, MongooseModule.forRoot('mongodb://localhost/')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

3. Agora, podemos criar um arquivo `.env` com as variàveis de ambiente:

```
MONGODB_URL=
```

4. Vamos ajustar a configuração do módulo do mongoDB:

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountsModule } from './accounts/accounts.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),
    AccountsModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      connectionName: 'test',
      useFactory: async (config: ConfigService) => ({
       uri: config.get('MONGODB_URL'),
       useNewUrlParser: true,
       useUnifiedTopology: true,
      }),
      inject: [ConfigService],
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

   
