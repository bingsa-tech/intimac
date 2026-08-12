import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  // CREATE
  async create(data: { userId: string; programId: string; motivation?: string }) {
    return this.prisma.application.create({
      data: {
        userId: data.userId,
        programId: data.programId,
        motivation: data.motivation,
      },
      include: {
        program: { include: { university: true } },
      },
    });
  }

  // READ (Mes candidatures)
  async findByUser(userId: string) {
    return this.prisma.application.findMany({
      where: { userId },
      include: {
        program: { include: { university: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // UPDATE (Sécurisé par userId)
  async update(id: string, userId: string, data: { motivation?: string }) {
    const app = await this.prisma.application.findUnique({ where: { id } });
    if (!app) throw new NotFoundException('Candidature introuvable');
    if (app.userId !== userId) throw new ForbiddenException('Accès refusé');

    return this.prisma.application.update({
      where: { id },
      data: { motivation: data.motivation },
      include: { program: { include: { university: true } } },
    });
  }

  // DELETE (Sécurisé par userId)
  async remove(id: string, userId: string) {
    const app = await this.prisma.application.findUnique({ where: { id } });
    if (!app) throw new NotFoundException('Candidature introuvable');
    if (app.userId !== userId) throw new ForbiddenException('Accès refusé');

    return this.prisma.application.delete({ where: { id } });
  }
}