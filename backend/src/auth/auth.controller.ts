import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express'; //IMPORTANTE
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res: Response) {
    const { access_token } = await this.authService.login(loginDto);

    res.cookie('token', access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    return res.send({
      sucesso: true,
      message: 'Login realizado',
    });
  }
}
