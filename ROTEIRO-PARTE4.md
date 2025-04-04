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

![image](https://github.com/user-attachments/assets/60d0c369-894b-40d0-a9c9-f903e8d73bf4)



### No controller:
```
@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @ApiBody({ type: CreateAccountDto }) 
  create(@Body() accountDto: CreateAccountDto) {
    return this.accountsService.create(accountDto);
  }
```
