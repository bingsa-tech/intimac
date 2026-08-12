import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCityDto } from './dto/city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CityService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCityDto: CreateCityDto) {
    // Vérifie si la province existe
    const provinceExists = await this.prisma.province.findUnique({
      where: { id: createCityDto.provinceId },
    });

    if (!provinceExists) {
      throw new NotFoundException(
        `La province avec l'ID ${createCityDto.provinceId} n'existe pas.`,
      );
    }

    return this.prisma.city.create({
      data: createCityDto,
      include: {
        province: true,
      },
    });
  }

  async findAll() {
    return this.prisma.city.findMany({
      include: {
        province: true,
      },
    });
  }

  async findOne(id: string) {
    const city = await this.prisma.city.findUnique({
      where: { id },
      include: {
        province: true,
        universities: true,
      },
    });

    if (!city) {
      throw new NotFoundException(`La ville avec l'ID ${id} n'existe pas.`);
    }

    return city;
  }

  async update(id: string, updateCityDto: UpdateCityDto) {
    await this.findOne(id);

    if (updateCityDto.provinceId) {
      const provinceExists = await this.prisma.province.findUnique({
        where: { id: updateCityDto.provinceId },
      });
      if (!provinceExists) {
        throw new NotFoundException(
          `La province avec l'ID ${updateCityDto.provinceId} n'existe pas.`,
        );
      }
    }

    return this.prisma.city.update({
      where: { id },
      data: updateCityDto,
      include: {
        province: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.city.delete({
      where: { id },
    });
  }
}