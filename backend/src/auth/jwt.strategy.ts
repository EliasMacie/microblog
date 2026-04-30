// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { ConfigService } from '@nestjs/config';
// import { Request } from 'express';

// const cookieExtractor = (req: Request) => {
//   console.log("Cookies no extractor:", req?.cookies);
//   return req?.cookies?.token || null;
// };

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(private configService: ConfigService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromExtractors([
//         cookieExtractor,
//         ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ]),
//       secretOrKey: configService.get<string>('JWT_SECRET'),
//       // ← sem passReqToCallback
//     });
//   }

//   async validate(payload: any) { // ← sem req
//     console.log("Payload recebido:", payload);
//     return {
//       userId: payload.sub,
//       email: payload.email,
//     };
//   }
// }