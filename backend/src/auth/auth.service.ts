
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service'; // Ajuste le chemin si besoin
import { RegisterDto, LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    // 1. Vérifier si l'utilisateur existe déjà
    const userExists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (userExists) {
      throw new ConflictException('Cet email est déjà utilisé');
    }

    // 2. Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // 3. Créer l'utilisateur ET son profil associé
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        role: dto.role || 'STUDENT',
        profile: {
          create: {
            firstName: dto.firstName,
            lastName: dto.lastName,
            country: dto.country,
            birthDate: new Date(dto.birthDate),
            gender: dto.gender,
            nationality: dto.nationality,
          },
        },
      },
      include: { profile: true },
    });

    return this.generateToken(user);
  }

  async login(dto: LoginDto) {
    // 1. Vérifier la présence de l'utilisateur avec son profil
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { profile: true }, // Inclut le profil pour récupérer le firstName
    });

    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    // 2. Comparer le mot de passe
    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    // 3. Générer le token et renvoyer les données complètes
    return this.generateToken(user);
  }

  // Helper pour générer la réponse de connexion/inscription
  private async generateToken(user: any) {
    const payload = { 
      sub: user.id, 
      email: user.email, 
      role: user.role 
    };
    
    const token = await this.jwtService.signAsync(payload);

    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role, // 👈 Requis par Vue Router pour l'aiguillage admin !
        firstName: user.profile?.firstName || 'Utilisateur',
        lastName: user.profile?.lastName || '',
      },
    };
  }
}