## Roteiro Parte 1 - Validação de dados nos endpoints

1. Instalar o Zod e o pacote de integração com NestJS

Execute o seguinte comando para instalar as dependências necessárias:

```bash
npm install zod @nestjs/zod
```

2. Criar a Pasta dto/, dentro do módulo, e Adicionar os Schemas com Zod
📂 Estrutura do diretório:

```sql
src/
 ├── accounts/
 │   ├── dto/
 │   │   ├── create-conta.dto.ts
 │   │   ├── update-conta.dto.ts
```

2.1.  📌 Criando o create-conta.dto.ts

```typescript
import { z } from 'zod';
import { createZodDto } from '@nestjs/zod';

export const CreateContaSchema = z.object({
  numero: z.number().int().positive(),
  titular: z.string().min(1, 'O titular é obrigatório'),
  saldo: z.number().nonnegative(),
  limite: z.number().nonnegative(),
});

export class CreateContaDto extends createZodDto(CreateContaSchema) {}
```
2.2. 📌 Criando o update-conta.dto.ts
Usamos Zod para permitir que os campos sejam opcionais:

```typescript
import { z } from 'zod';
import { createZodDto } from '@nestjs/zod';

export const UpdateContaSchema = z.object({
  numero: z.number().int().positive().optional(),
  titular: z.string().min(1).optional(),
  saldo: z.number().nonnegative().optional(),
  limite: z.number().nonnegative().optional(),
});

export class UpdateContaDto extends createZodDto(UpdateContaSchema) {}
```
3.  Utilizar os DTOs no Controller
Agora aplicamos a validação no Controller:
```typescript
import { Body, Controller, Post, Patch } from '@nestjs/common';
import { CreateContaDto } from './dto/create-conta.dto';
import { UpdateContaDto } from './dto/update-conta.dto';

@Controller('contas')
export class ContaController {
  @Post()
  criarConta(@Body() createContaDto: CreateContaDto) {
    return { message: 'Conta criada com sucesso!', data: createContaDto };
  }

  @Patch()
  atualizarConta(@Body() updateContaDto: UpdateContaDto) {
    return { message: 'Conta atualizada com sucesso!', data: updateContaDto };
  }
}
```


## Roteiro parte 2 - Banco de dados:

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
    import { Prop, Schema, SchemaFactory } from 'mongoose';

    @Schema({ collection: 'contas' })
    export class Contas {
      @Prop({ required: true })
      numero: number;
      @Prop({ required: true })
      titular: string;
      @Prop({ required: true })
      saldo: number;
      @Prop({ required: true })
      limite: number;
    }
    export const ContasSchema = SchemaFactory.createForClass(Contas)
   ```
   Import esse schema no `conta.module`:
    ```typescript
    import { Contas, ContasSchema } from './schemas/constas.schema'
    ... 
    imports : [MongooseModule.forFeature([{name : Contas.name, schema: ContasSchema}])],
    ...
    ```
    
5. **Adicionar em imports no modulo contas**:

```typescript
   import { MongooseModule } from '@nestjs/mongoose';
   import { Contas, ContasSchema } from './schemas/contas.schema';
   ...
   @Module({
     imports: [MongooseModule.forFeature([{ name: Contas.name, schema: ContasSchema }])],
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

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contas } from './schemas/contas.schema';
import { CreateContaDto } from './dto/create-conta-dto';
import { UpdateContaDto } from './dto/update-user-dto';

@Injectable()
export class ConstasService {
  constructor(@InjectModel(Contas.name) private contaModel: Model<Contas>) {}
  create(conta: CreateContaDto)  {
    const createdConta = new this.contaModel(conta);
    return createdConta.save();
  }

  findAll()  {
    return this.contaModel.find().exec();
  }

  findOne(numero: number)  {
    return this.contaModel.findOne({ numero: numero }).exec();
  }

  async update(id: number, conta: UpdateContaDto)  {
    const conta = await this.contaModel.findOneAndUpdate({ numero: numero }, conta).exec();
    return conta
  }

  async remove(id: number)  {
    const conta = await this.contaModel.findOneAndDelete({ numero: numero }).exec();
    return conta
  }
}
```
   
