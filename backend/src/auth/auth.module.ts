// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'mon imaginaire se cristalise ici',
      signOptions: { expiresIn: '7d' }, // Token valide 7 jours
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // 👈 Retrait de PrismaService (géré par UsersModule/PrismaModule)
  exports: [AuthService],
})
export class AuthModule {}