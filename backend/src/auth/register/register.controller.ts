import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interface/user.interface';
import { ValidarCodigoDto } from './dto/validar-codigo.dto';

@Controller('user/register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post()
  async createOne(@Body() createUserDto: CreateUserDto) {
    return this.registerService.createOne(createUserDto);
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
