## Swagger

### Install Required Dependencies

```
npm install --save @nestjs/swagger swagger-ui-express

```

### Configuração do módulo Swagger

No arquivo `main.ts`

```typescript
// Setting API Path
  const apiPath = 'api';
  app.setGlobalPrefix(apiPath);

  // Swagger Options
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Nest-js Swagger Example API')
    .setDescription('Swagger Example API API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  // Swagger path: http://localhost:3200/api/docs
  SwaggerModule.setup(`${apiPath}/docs`, app, document);
```

### Acesse a api pelo navegador

[http://localhost:3000/api/docs](http://localhost:3000/api/docs)


### Exemplo de documentação (Post /api)
No Swagger, precisamos criar um Dto para mostrar o corpo que esperamos do usuário.

```typescript
  import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

  export class CreateDemoDto {
    @ApiPropertyOptional({
      type: Number,
      description: 'This is an optional property',
    })
    id: number;
    @ApiProperty({
      type: String,
      description: 'This is a required property',
    })
    name: string;
    @ApiProperty({
      type: String,
      description: 'This is a required property',
    })
    abbreviation: string;
  }
```
