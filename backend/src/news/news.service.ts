import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Ajustez le chemin vers votre PrismaService
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

@Injectable()
export class NewsService {
  constructor(private readonly prisma: PrismaService) {}

  // Récupérer toutes les actualités publiées (triées par date)
  async findAll() {
    return this.prisma.news.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Récupérer une actualité par son ID
  async findOne(id: string) {
    const news = await this.prisma.news.findUnique({
      where: { id },
    });

    if (!news) {
      throw new NotFoundException(`L'actualité avec l'ID "${id}" n'a pas été trouvée.`);
    }

    return news;
  }

  // Créer une actualité
  async create(dto: CreateNewsDto) {
    return this.prisma.news.create({
      data: dto,
    });
  }

  // Mettre à jour une actualité
  async update(id: string, dto: UpdateNewsDto) {
    await this.findOne(id); // Vérifie l'existence
    return this.prisma.news.update({
      where: { id },
      data: dto,
    });
  }

  // Supprimer une actualité
  async remove(id: string) {
    await this.findOne(id); // Vérifie l'existence
    return this.prisma.news.delete({
      where: { id },
    });
  }
}