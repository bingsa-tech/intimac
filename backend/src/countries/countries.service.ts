// src/countries/countries.service.ts
import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCountryDto } from './dto/country.dto';

@Injectable()
export class CountriesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCountryDto) {
    const existing = await this.prisma.country.findFirst({
      where: { name: { equals: dto.name, mode: 'insensitive' } },
    });
    if (existing) {
      throw new ConflictException('Ce pays existe déjà');
    }
    return this.prisma.country.create({ data: dto });
  }

  async findAll() {
    return this.prisma.country.findMany({
      orderBy: { name: 'asc' },
    });
  }
}