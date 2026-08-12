// src/auth/strategies/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'mon imaginaire se cristalise ici',
    });
  }

  async validate(payload: { sub: string; email: string; role: string }) {
    // On retourne directement les infos contenues et signées dans le Token
    return { 
      id: payload.sub, 
      email: payload.email, 
      role: payload.role 
    };
  }
}