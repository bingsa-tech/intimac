import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubscriptionDto } from './dto/subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateSubscriptionDto) {
    // Vérifier si un abonnement existe déjà pour cet utilisateur
    const existing = await this.prisma.subscription.findUnique({
      where: { userId: dto.userId },
    });

    if (existing) {
      throw new ConflictException('Un abonnement existe déjà pour cet utilisateur.');
    }

    return this.prisma.subscription.create({
      data: {
        userId: dto.userId,
        plan: dto.plan,
        status: dto.status,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        stripeId: dto.stripeId,
      },
      include: { user: true },
    });
  }

  async findAll() {
    return this.prisma.subscription.findMany({
      include: { user: true },
    });
  }

  async findOne(id: string) {
    const sub = await this.prisma.subscription.findUnique({
      where: { id },
      include: { user: true },
    });
    if (!sub) throw new NotFoundException(`Abonnement ${id} introuvable.`);
    return sub;
  }

  async findByUserId(userId: string) {
    const sub = await this.prisma.subscription.findUnique({
      where: { userId },
    });
    if (!sub) throw new NotFoundException(`Aucun abonnement trouvé pour l'utilisateur ${userId}.`);
    return sub;
  }

  async update(id: string, dto: UpdateSubscriptionDto) {
    await this.findOne(id);
    return this.prisma.subscription.update({
      where: { id },
      data: {
        ...(dto.plan && { plan: dto.plan }),
        ...(dto.status && { status: dto.status }),
        ...(dto.startDate && { startDate: new Date(dto.startDate) }),
        ...(dto.endDate && { endDate: new Date(dto.endDate) }),
        ...(dto.stripeId !== undefined && { stripeId: dto.stripeId }),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.subscription.delete({ where: { id } });
  }
}