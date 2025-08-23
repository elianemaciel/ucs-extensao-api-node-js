# 🎯 Roteiro do Tutorial: Publicação e Processamento de Mensagens com Redis no NestJS
## Pré-requisitos

- Node.js e npm instalados.
- Redis instalado (local ou em Docker).
- Comando para rodar no Docker:
```bash
docker run --name redis -p 6379:6379 -d redis
```

## Instalação das Dependências

Pacotes necessários:

```bash
npm install ioredis @nestjs/microservices
```


## Configuração do Redis no NestJS

### Criar um módulo RedisModule

```bash
nest g module redis
```
```
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

### Criar um PublisherService

```bash
nest g service publisher
```

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
```

### Criar um Controller para testar

```bash
nest g controller messages
```

```
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
```

## Processamento (Subscriber)
### Criar um SubscriberService

```bash
nest g service publisher
```

```
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
``



Ver no terminal do NestJS:

Mensagem recebida em notifications: Olá do Redis!
