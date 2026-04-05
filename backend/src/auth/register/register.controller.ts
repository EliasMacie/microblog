/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Query, Param, HttpStatus, HttpException } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interface/user.interface';
import { ValidarCodigoDto } from './dto/validar-codigo.dto';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';

@Controller('user/register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post('criar')
  async criarUsuario(@Body() criarUsuario: CriarUsuarioDto) {
    try {
      const result = await this.registerService.criarUsuario(criarUsuario);
      console.log(result)
      return result; // ⚡ NestJS transforma em JSON automaticamente
    } catch (error) {
      console.error(error);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      throw new HttpException(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        { sucesso: false, mensagem: error.message },
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('validarCodigo')
  async validarCodigo(@Body() validarCodigoDto: ValidarCodigoDto) {
    return this.registerService.validarCodigo(validarCodigoDto);
  }
  @Post('enviarCodigo')
  async enviarEmail(@Body('email') email: string) {
    return this.registerService.enviarCodigo(email);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.registerService.findAll();
  }
}
