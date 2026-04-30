import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { Request } from 'express';

interface RequestWithUser extends Request {
  user: {
    userId: number;
    email: string;
  };
}

@Controller('user')
export class UserController {

    @UseGuards(AuthGuard)
    @Get('me')
    getMe(@Req() req: RequestWithUser) {
        return req.user;
    }
}