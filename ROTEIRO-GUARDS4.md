1. Criar o Service e o Controller usando o Nest CLI
Execute os comandos abaixo para gerar automaticamente os arquivos:
```
nest g service auth
nest g controller auth
```
Instalação do jsonwebtoken
```
npm install jsonwebtoken @types/jsonwebtoken
```
Isso criará os arquivos auth.service.ts e auth.controller.ts dentro da pasta auth/.

2. Implementar o AuthService
Edite o arquivo auth.service.ts para criar e validar tokens JWT:

```
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET;

  generateToken(userId: string): string {
    return sign({ sub: userId }, this.jwtSecret, { expiresIn: '1h' });
  }

  validateToken(token: string): any {
    try {
      return verify(token, this.jwtSecret);
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
```

3. Implementar o AuthController
Edite o arquivo auth.controller.ts para expor um endpoint que gere tokens:

```
import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: { userId: string }) {
    const token = this.authService.generateToken(body.userId);
    return { accessToken: token };
  }
}
```

4. Criar o Guard de Autenticação
```
nest g guard guards/auth
```
Edite o arquivo auth.guard.ts para validar o token JWT:

```
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    if (!token) {
      throw new UnauthorizedException('Token não fornecido');
    }

    request['user'] = this.authService.validateToken(token);
    return true;
  }

  private extractToken(request: Request): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    return authHeader.split(' ')[1];
  }
}

```
5. Aplicar o Guard no Controller
Agora, qualquer endpoint protegido exigirá um token JWT válido:
```
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard'; // importa o guard criado

// Esse é um exemplo de controler
@Controller('users')
export class UsersController {
  @Get('profile')
  @UseGuards(AuthGuard) // É essa linha que deverá ser adicionada na sua função.
  getProfile(@Req() req) {
    return { user: req.user };
  }
}
```
6. Configurar a Chave Secreta
No arquivo .env, adicione:
```
JWT_SECRET=seu_segredo_super_secreto
```
E no main.ts, carregue as variáveis de ambiente:

```
import * as dotenv from 'dotenv';
dotenv.config();
```
