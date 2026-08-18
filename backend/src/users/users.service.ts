import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // CREATE : Transaction atomique (User + Profile)
  async create(createUserDto: CreateUserDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });

    if (existing) {
      throw new ConflictException('Un utilisateur avec cet email existe déjà');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const parsedBirthDate = createUserDto.birthDate 
      ? new Date(createUserDto.birthDate) 
      : new Date('2000-01-01'); // Date par défaut si absente

    return this.prisma.$transaction(async (tx) => {
      // 1. Création de l'utilisateur
      const user = await tx.user.create({
        data: {
          email: createUserDto.email,
          password: hashedPassword,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          birthDate: createUserDto.birthDate ? new Date(createUserDto.birthDate) : null,
          role: createUserDto.role,
        },
      });

      // 2. Création du profil lié
      await tx.profile.create({
        data: {
          userId: user.id,
          firstName: createUserDto.firstName || '',
          lastName: createUserDto.lastName || '',
          birthDate: parsedBirthDate,
          gender: createUserDto.gender,
          nationality: createUserDto.nationality,
          country: createUserDto.country,
          phone: createUserDto.phone,
          address: createUserDto.address,
          city: createUserDto.city,
          highestEducation: createUserDto.highestEducation,
          experience: createUserDto.experience,
          gpa: createUserDto.gpa,
          budget: createUserDto.budget,
          englishLevel: createUserDto.englishLevel,
          frenchLevel: createUserDto.frenchLevel,
          photo: createUserDto.photo,
        },
      });

      // Exclure le mot de passe du retour
      const { password, ...result } = user;
      return result;
    });
  }

  // READ : Tous les utilisateurs
  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
      },
    });
  }

  // READ : Tous les conseillers
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

  // READ : Par ID avec profil
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });

    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }

    const { password, ...result } = user;
    return result;
  }

  // READ : Par Email (Utile pour le Login dans AuthService)
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { profile: true },
    });
  }

  // UPDATE : Mise à jour synchronisée (User + Profile)
  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    const userData: any = {};
    const profileData: any = {};

    // Séparation des champs User
    if (updateUserDto.email) userData.email = updateUserDto.email;
    if (updateUserDto.firstName) userData.firstName = updateUserDto.firstName;
    if (updateUserDto.lastName) userData.lastName = updateUserDto.lastName;
    if (updateUserDto.role) userData.role = updateUserDto.role;
    if (updateUserDto.password) {
      userData.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    if (updateUserDto.birthDate) {
      userData.birthDate = new Date(updateUserDto.birthDate);
      profileData.birthDate = new Date(updateUserDto.birthDate);
    }

    // Séparation des champs Profile
    if (updateUserDto.firstName) profileData.firstName = updateUserDto.firstName;
    if (updateUserDto.lastName) profileData.lastName = updateUserDto.lastName;
    if (updateUserDto.gender) profileData.gender = updateUserDto.gender;
    if (updateUserDto.nationality) profileData.nationality = updateUserDto.nationality;
    if (updateUserDto.country) profileData.country = updateUserDto.country;
    if (updateUserDto.phone) profileData.phone = updateUserDto.phone;
    if (updateUserDto.address) profileData.address = updateUserDto.address;
    if (updateUserDto.city) profileData.city = updateUserDto.city;
    if (updateUserDto.highestEducation) profileData.highestEducation = updateUserDto.highestEducation;
    if (updateUserDto.experience) profileData.experience = updateUserDto.experience;
    if (updateUserDto.gpa) profileData.gpa = updateUserDto.gpa;
    if (updateUserDto.budget) profileData.budget = updateUserDto.budget;
    if (updateUserDto.englishLevel) profileData.englishLevel = updateUserDto.englishLevel;
    if (updateUserDto.frenchLevel) profileData.frenchLevel = updateUserDto.frenchLevel;
    if (updateUserDto.photo) profileData.photo = updateUserDto.photo;

    // Mise à jour via transaction
    return this.prisma.$transaction(async (tx) => {
      if (Object.keys(userData).length > 0) {
        await tx.user.update({
          where: { id },
          data: userData,
        });
      }

      if (Object.keys(profileData).length > 0) {
        await tx.profile.update({
          where: { userId: id },
          data: profileData,
        });
      }

      return this.findOne(id);
    });
  }

  // DELETE
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.user.delete({
      where: { id },
    });
  }
}