import { Injectable } from '@nestjs/common';
import { User } from './interface/user.interface';

@Injectable()
export class RegisterService {
  private readonly users: User[] = [];

  createOne(user: User) {
    this.users.push(user);
  }

  findAll() {
    return this.users;
  }
}
