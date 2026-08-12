import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { CreateScholarshipDto } from './dto/scholarship.dto';
import { UpdateScholarshipDto } from './dto/update-scholarship.dto';

@Injectable()
export class ScholarshipService {
  constructor(private readonly prisma: PrismaService) {}

  // 1. Créer une bourse
  async create(createDto: CreateScholarshipDto) {
    return this.prisma.scholarship.create({
      data: {
        ...createDto,
        deadline: new Date(createDto.deadline),
      },
      include: {
        country: true,
        university: true,
      },
    });
  }

  // 2. Récupérer toutes les bourses (avec filtres optionnels)
  async findAll(countryId?: string, universityId?: string) {
    return this.prisma.scholarship.findMany({
      where: {
        ...(countryId && { countryId }),
        ...(universityId && { universityId }),
      },
      include: {
        country: { select: { id: true, name: true, code: true } },
        university: { select: { id: true, name: true } },
      },
      orderBy: { deadline: 'asc' },
    });
  }

  // 3. Récupérer une bourse par son ID
  async findOne(id: string) {
    const scholarship = await this.prisma.scholarship.findUnique({
      where: { id },
      include: {
        country: true,
        university: true,
      },
    });

    if (!scholarship) {
      throw new NotFoundException(`Bourse avec l'ID ${id} introuvable.`);
    }

    return scholarship;
  }

  // 4. Mettre à jour une bourse
  async update(id: string, updateDto: UpdateScholarshipDto) {
    await this.findOne(id); // Vérifie l'existence

    return this.prisma.scholarship.update({
      where: { id },
      data: {
        ...updateDto,
        ...(updateDto.deadline && { deadline: new Date(updateDto.deadline) }),
      },
      include: {
        country: true,
        university: true,
      },
    });
  }

  // 5. Supprimer une bourse
  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.scholarship.delete({
      where: { id },
    });
  }
}
