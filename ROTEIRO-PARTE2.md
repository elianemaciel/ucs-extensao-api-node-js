## Roteiro parte 2 - Banco de dados:

1. Criar banco de dados:
[mongodb Atlas](https://www.mongodb.com/pt-br/cloud/atlas/register)


2. **Configurando o MongoDB**

   Para este exemplo, vamos usar o Mongoose para interagir com um banco de dados NoSQL.

   ```bash
   npm install --save @nestjs/mongoose mongoose
   ```

3. **Importando o mongoDB**:
  No modulo de contas vamos importar o mongoose:
  ```typescript
    import { MongooseModule } from '@nestjs/mongoose';
  ```

4. **Adicionar em imports**:

Substitua a URL com a url de conexão adquirida no MongoDB Atlas.
```typescript
...
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/'),
    { dbName: 'teste' }
  ],
  controllers: [ContasController],
  providers: [ContasService],
})
export class ContasModule {}
```

5. **Construindo o Schema:**
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
   
7. **Validação dos dados de entrada:**
  Crie um pasta chamada `dto` dentro dela vamos incluir o arquivo `create-conta.dto.ts`.
  ```typescript
  import { IsEmail, IsNotEmpty } from 'class-validator';

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

5. **Configurando o Model/Service**

O arquivo do serviço é responsável pela interação e comunicação com o banco de dados MongoDB. Ele é usado para criar, recuperar, atualizar e excluir registros.
```typescript
...

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contas } from './schemas/cat.schema';

@Injectable()
export class ConstasService {
  constructor(@InjectModel(Contas.name) private contaModel: Model<Contas>) {}
  create(conta: any)  {
    const createdConta = new this.contaModel(createContaDto);
    return createdConta.save();
  }

  findAll()  {
    return this.contaModel.find().exec();
  }

  findOne(id: number)  {
    return this.contaModel.findById(id).exec();
  }

  async update(id: number, conta: any)  {
    const conta = await this.contaModel.findByIdAndUpdate(id, conta).exec();
    return conta
  }

  async remove(id: number)  {
    const task = await this.contaModel.findByIdAndDelete(id).exec();
    return conta
  }
}
```
