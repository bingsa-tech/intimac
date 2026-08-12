import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // CREATE (Créer un utilisateur)
  async create(createUserDto: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existing) {
      throw new ConflictException('Un utilisateur avec cet email existe déjà');
    }

    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  // READ (Récupérer tous les utilisateurs)
  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
      },
    });
  }

  // READ (Récupérer tous les conseillers)
  async findAdvisors() {
    return this.prisma.user.findMany({
      where: { role: Role.ADVISOR },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });
  }

  // READ (Récupérer un utilisateur par son ID)
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }

    return user;
  }

  // UPDATE (Mettre à jour un utilisateur)
  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id); // Vérifie que l'utilisateur existe

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  // DELETE (Supprimer un utilisateur)
  async remove(id: string) {
    await this.findOne(id); // Vérifie que l'utilisateur existe

    return this.prisma.user.delete({
      where: { id },
    });
  }
}