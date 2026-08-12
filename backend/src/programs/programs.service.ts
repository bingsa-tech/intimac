import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProgramDto, FilterProgramsDto, UpdateProgramDto } from './dto/program.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProgramsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProgramDto: CreateProgramDto) {
    // 👈 1. Extraire 'languages' du reste des données
    const { languages, ...programData } = createProgramDto;

    return this.prisma.program.create({
      data: {
        ...programData,
        // 👈 2. Mapper la relation Prisma pour les langues
        languages: languages
          ? {
              create: languages.map((lang) => ({ language: lang })),
            }
          : undefined,
      },
      include: {
        languages: true,
        university: true,
      },
    });
  }

  async findAll(filters: FilterProgramsDto) {
    const { country, degree, maxTuition, minGpa, search, language } = filters;
    const where: Prisma.ProgramWhereInput = {};

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (degree) where.degree = degree;
    if (maxTuition !== undefined) where.tuition = { lte: maxTuition };
    if (minGpa !== undefined) where.minimumGpa = { gte: minGpa };

    if (country) {
      where.university = {
        country: {
          name: { contains: country, mode: 'insensitive' },
        },
      };
    }

    if (language) {
      where.languages = {
        some: {
          language: { equals: language, mode: 'insensitive' },
        },
      };
    }

    return this.prisma.program.findMany({
      where,
      include: {
        university: {
          include: { country: true, province: true, city: true },
        },
        languages: true,
      },
    });
  }

  async findOne(id: string) {
    const program = await this.prisma.program.findUnique({
      where: { id },
      include: {
        university: {
          include: { country: true, province: true, city: true },
        },
        languages: true,
      },
    });

    if (!program) {
      throw new NotFoundException(`Le programme avec l'ID ${id} n'existe pas.`);
    }

    return program;
  }

  async update(id: string, updateProgramDto: UpdateProgramDto) {
    await this.findOne(id);
    const { languages, ...programData } = updateProgramDto;

    return this.prisma.program.update({
      where: { id },
      data: {
        ...programData,
        ...(languages && {
          languages: {
            deleteMany: {},
            create: languages.map((lang) => ({ language: lang })),
          },
        }),
      },
      include: {
        university: true,
        languages: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.program.delete({
      where: { id },
    });
  }
}