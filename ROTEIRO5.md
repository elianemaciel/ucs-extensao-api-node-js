# 🎯 Roteiro do Tutorial: Publicação e Processamento de Mensagens com Redis no NestJS
## Pré-requisitos

- Node.js e npm instalados.
- Redis instalado (local ou em Docker).
- Comando para rodar no Docker:
```
docker run --name redis -p 6379:6379 -d redis
``

## Instalação das Dependências

Pacotes necessários:

``
npm install ioredis @nestjs/microservices
```


## Configuração do Redis no NestJS

4.1. Criar um módulo RedisModule

```
nest g module redis
```
``
import { Module, Global } from '@nestjs/common';
import { createClient } from 'redis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useFactory: async () => {
        const client = createClient({ url: 'redis://localhost:6379' });
        await client.connect();
        return client;
      },
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
```

## Publicação de Mensagens

## Criar um PublisherService

```
nest g service publisher
```
import { Injectable, Inject } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class PublisherService {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  async publish(channel: string, message: string) {
    await this.redisClient.publish(channel, message);
    console.log(`Mensagem publicada no canal ${channel}: ${message}`);
  }
}

5.2. Criar um Controller para testar
import { Controller, Post, Body } from '@nestjs/common';
import { PublisherService } from './publisher.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly publisherService: PublisherService) {}

  @Post()
  async sendMessage(@Body() body: { channel: string; message: string }) {
    return this.publisherService.publish(body.channel, body.message);
  }
}

6. Processamento (Subscriber)
6.1. Criar um SubscriberService
import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class SubscriberService implements OnModuleInit {
  constructor(
    @Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType,
  ) {}

  async onModuleInit() {
    const subscriber = this.redisClient.duplicate();
    await subscriber.connect();
    await subscriber.subscribe('notifications', (message) => {
      console.log(`Mensagem recebida em notifications: ${message}`);
    });
  }
}

7. Testando o Fluxo

Subir o projeto:

npm run start:dev


Enviar mensagem via Postman/Insomnia:

POST http://localhost:3000/messages
Body: {
  "channel": "notifications",
  "message": "Olá do Redis!"
}


Ver no terminal do NestJS:

Mensagem recebida em notifications: Olá do Redis!
