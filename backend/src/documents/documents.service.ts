import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DocumentType } from '@prisma/client'; // 👈 Import depuis Prisma

@Injectable()
export class DocumentsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    originalName: string;
    filename: string;
    filePath: string;
    type: DocumentType;
    userId: string;
  }) {
    return this.prisma.document.create({
      data: {
        originalName: data.originalName,
        filename: data.filename,
        filePath: data.filePath,
        type: data.type,
        userId: data.userId,
      },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.document.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}