import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Ajustez le chemin vers Prisma
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  // 1. Créer un message (Public)
  async create(dto: CreateContactDto) {
    return this.prisma.contactMessage.create({
      data: dto,
    });
  }

  // 2. Lister tous les messages (Admin)
  async findAll() {
    return this.prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // 3. Obtenir un message par ID
  async findOne(id: string) {
    const message = await this.prisma.contactMessage.findUnique({ where: { id } });
    if (!message) throw new NotFoundException('Message non trouvé');
    return message;
  }

  // 4. Mettre à jour le statut (Admin)
  async update(id: string, dto: UpdateContactDto) {
    await this.findOne(id);
    return this.prisma.contactMessage.update({
      where: { id },
      data: dto,
    });
  }

  // 5. Supprimer un message (Admin)
  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.contactMessage.delete({ where: { id } });
  }
}