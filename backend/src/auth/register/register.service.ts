import { Injectable } from '@nestjs/common';
import { User } from './interface/user.interface';
import * as nodemailer from 'nodemailer';

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

@Injectable()
export class RegisterService {
  private readonly users: User[] = [];

  createOne(user: User) {
    this.users.push(user);
  }

  async enviarCodigo(email: string) {
    const codigo = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: `${emailUser}`,
        pass: `${emailPass}`,
      },
    });
    try {
      const info = await transporter.sendMail({
        from: `"katruz" <${emailUser}>`,
        to: `${email}`,
        subject: 'Codigo de Verifição',
        text: `${codigo}`,
      });

      console.log('Email Enviado: ', info.messageId);
      return { sucesso: true, codigo };
    } catch (error) {
      console.error('Email Enviado: ', error);
      return { sucesso: false };
    }
  }

  findAll() {
    return this.users;
  }
}
