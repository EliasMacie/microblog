import { Controller, Get, Post, Body, Query, Param } from '@nestjs/common';
import { RegisterService } from './register.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interface/user.interface';

@Controller('user/register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post()
  async createOne(@Body() createUserDto: CreateUserDto) {
    return this.registerService.createOne(createUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.registerService.findAll();
  }
}
