/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.dataSource.query(
      `SELECT * FROM utilizador WHERE email=?`,
      [loginDto.email],
    );

    if (!user.length) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const isMatch = await bcrypt.compare(loginDto.password, user[0].senha_hash);

    if (!isMatch) {
      throw new UnauthorizedException('Senha inválida');
    }

    const payload = {
      sub: user[0].id,
      email: user[0].email,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
