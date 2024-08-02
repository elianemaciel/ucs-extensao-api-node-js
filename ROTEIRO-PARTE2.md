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
       MongooseModule.forRoot('mongodb://localhost/')
     ],
     controllers: [AppController],
     providers: [AppService],
   })
   export class AppModule {}
   ```

4. **Construindo o Schema:**
  Vamos criar uma pasta chamada `schemas`, e crie um arquivo `contas.schema.ts`.

   ```bash
      npm install --save class-validator
   ```
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

6. **Validação dos dados de entrada:**
  Crie um pasta chamada `dto` dentro dela vamos incluir o arquivo `create-conta.dto.ts`.
  ```
      npm install --save class-validator
  ```
  ```typescript
  import { IsNotEmpty } from 'class-validator';

  export class CreateContaDto {
    @IsNotEmpty()
    numero: number;
    @IsNotEmpty()
    titular: string;
    @IsNotEmpty()
    saldo: number;
    @IsNotEmpty()
    limite: number;
  }
  ```

Crie um arquivo para validar o update:
``typescript
   import { IsOptional } from 'class-validator';
   
   export class UpdateContaDto {
     @IsOptional()
     numero: number;
   
     @IsOptional()
     titular: string;
   
     @IsOptional()
     saldo: number;
   
     @IsOptional()
     limite: number;
   }
```

5. **Configurando o Model/Service**

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
    const conta = await this.contaModel.findOneAndUpdate(id, conta).exec();
    return conta
  }

  async remove(id: number)  {
    const task = await this.contaModel.findByIdAndDelete(id).exec();
    return conta
  }
}
```

7. **Atualizando o controller**
   No controller onde temos as entradas para o POST e PUT vamos tipar com os DTO criados:
   ```typescript
  @Post()
  create(@Body() conta: CreateContaDto) {
    return this.contasService.create(conta);
  }
  @Put(':id')
  update(@Param('id') id: number, @Body() conta: UpdateContaDto) {
    return this.contasService.update(id, conta);
  }
   
   ```
   
