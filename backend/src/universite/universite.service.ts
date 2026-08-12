// src/universities/universities.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUniversityDto, UpdateUniversityDto } from './dto/university.dto';

@Injectable()
export class UniversitiesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUniversityDto) {
    return this.prisma.university.create({
      data: dto,
      include: { country: true, province: true, city: true },
    });
  }

  async findAll() {
    return this.prisma.university.findMany({
      include: {
        country: true,
        province: true,
        city: true,
        _count: { select: { programs: true } },
      },
    });
  }

  async findOne(id: string) {
    const university = await this.prisma.university.findUnique({
      where: { id },
      include: {
        country: true,
        province: true,
        city: true,
        programs: true,
      },
    });

    if (!university) {
      throw new NotFoundException(`Université avec l'ID ${id} introuvable`);
    }

    return university;
  }

  async update(id: string, dto: UpdateUniversityDto) {
    await this.findOne(id); // Vérifie l'existence
    return this.prisma.university.update({
      where: { id },
      data: dto,
      include: { country: true, province: true, city: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.university.delete({ where: { id } });
  }
}