// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // 1. Inscription : appelle le UsersService
  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    
    // Génère le token JWT immédiatement ou retourne l'utilisateur créé
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  // 2. Connexion
  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(dto.email); // Assurez-vous d'avoir une méthode de recherche par email
    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }
}