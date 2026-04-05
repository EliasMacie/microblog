/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './interface/user.interface';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { ValidarCodigoDto } from './dto/validar-codigo.dto';
import { CriarUsuarioDto } from './dto/criar-usuario.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {
  private readonly users: User[] = [];

  constructor(
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {}

  async criarUsuario(criarUsuario: CriarUsuarioDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const senhaHash = await bcrypt.hash(criarUsuario.password, 10);

      const response1 = await queryRunner.query(
        `CALL utilizador(?, NULL, ?, ?, ?, ?)`,
        [
          'criar',
          criarUsuario.nomeCompleto,
          criarUsuario.email,
          senhaHash,
          criarUsuario.data,
        ],
      );

      const utilizadorId = response1?.[0]?.[0]?.id;
      if (!utilizadorId) throw new Error('Erro ao criar utilizador');

      const response2 = await queryRunner.query(
        `CALL perfil(?, NULL, ?, ?, ?, ?, NULL, NULL, NULL)`,
        [
          'criar',
          utilizadorId,
          criarUsuario.nomePerfil,
          criarUsuario.username,
          0,
        ],
      );

      const perfilId = response2?.[0]?.[0]?.id;
      if (!perfilId) throw new Error('Erro ao criar perfil');

      await queryRunner.commitTransaction();

      return { sucesso: true, utilizadorId, perfilId };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Erro na transação:', error);
      return { sucesso: false, mensagem: (error as Error).message };
    } finally {
      await queryRunner.release();
    }
  }

  async validarCodigo(validarCodigo: ValidarCodigoDto) {
    const sql = `CALL otp(?, ?, ?, NULL)`;

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const resultado = await this.dataSource.query(sql, [
        'validar_codigo',
        validarCodigo.email,
        validarCodigo.codigo,
      ]);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const status = resultado?.[0]?.[0]?.status;

      console.log('STATUS:', status);

      if (status === 'VALIDO') {
        return { sucesso: true };
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        return { sucesso: false, status };
      }
    } catch (error) {
      console.error('falha na validação', error as Error);
      return { sucesso: false };
    }
  }

  gerarCodigo(): string {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6 dígitos
  }

  async enviarCodigo(email: string) {
    const emailUser = this.configService.get<string>('EMAIL_USER');
    const emailPass = this.configService.get<string>('EMAIL_PASS');
    const codigo = this.gerarCodigo();

    const sql = `CALL otp(
      ?,
      ?,
      ?,
      ?
    )`;

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

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const resultado = await this.dataSource.query(sql, [
        'salvar_codigo',
        email,
        codigo,
        new Date(Date.now() + 5 * 60 * 1000),
      ]);

      console.log('Email Enviado: ', info.messageId);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const status = resultado?.[0]?.[0]?.status;

      if (status === 'CODIGO_SALVO') {
        console.log(status);
        return { sucesso: true };
      }
    } catch (error) {
      console.error('Email Enviado: ', error as Error);
      return { sucesso: false };
    }
  }

  findAll() {
    return this.users;
  }
}
