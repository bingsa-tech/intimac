import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProvinceDto } from './dto/province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';

@Injectable()
export class ProvinceService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProvinceDto: CreateProvinceDto) {
    // Vérifie si le pays existe
    const countryExists = await this.prisma.country.findUnique({
      where: { id: createProvinceDto.countryId },
    });

    if (!countryExists) {
      throw new NotFoundException(
        `Le pays avec l'ID ${createProvinceDto.countryId} n'existe pas.`,
      );
    }

    return this.prisma.province.create({
      data: createProvinceDto,
      include: {
        country: true,
      },
    });
  }

  async findAll() {
    return this.prisma.province.findMany({
      include: {
        country: true,
        cities: true,
      },
    });
  }

  async findOne(id: string) {
    const province = await this.prisma.province.findUnique({
      where: { id },
      include: {
        country: true,
        cities: true,
        universities: true,
      },
    });

    if (!province) {
      throw new NotFoundException(
        `La province avec l'ID ${id} n'existe pas.`,
      );
    }

    return province;
  }

  async update(id: string, updateProvinceDto: UpdateProvinceDto) {
    await this.findOne(id);

    if (updateProvinceDto.countryId) {
      const countryExists = await this.prisma.country.findUnique({
        where: { id: updateProvinceDto.countryId },
      });
      if (!countryExists) {
        throw new NotFoundException(
          `Le pays avec l'ID ${updateProvinceDto.countryId} n'existe pas.`,
        );
      }
    }

    return this.prisma.province.update({
      where: { id },
      data: updateProvinceDto,
      include: {
        country: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.province.delete({
      where: { id },
    });
  }
}