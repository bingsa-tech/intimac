import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class AdminService {
  private static readonly ONLINE_THRESHOLD_MS = 60 * 1000;

  constructor(private readonly prisma: PrismaService) {}

  async getDashboardStats() {
    const [students, advisors, admins] = await Promise.all([
      this.prisma.user.count({
        where: { role: Role.STUDENT },
      }),
      this.prisma.user.count({
        where: { role: Role.ADVISOR },
      }),
      this.prisma.user.count({
        where: { role: Role.ADMIN },
      }),
    ]);

    return {
      students,
      advisors,
      admins,
      totalUsers: students + advisors + admins,
    };
  }

  async getUsers() {
    const users = await this.prisma.user.findMany({
      orderBy: {
        lastSeen: 'desc',
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        role: true,
        lastSeen: true,
      },
    });

    const now = Date.now();

    return users.map((user) => ({
      id: user.id,
      fullName: [user.firstName, user.lastName].filter(Boolean).join(' '),
      role: user.role,
      isOnline: this.isUserOnline(user.lastSeen, now),
      lastSeen: user.lastSeen,
    }));
  }

  private isUserOnline(lastSeen: Date | null, now: number): boolean {
    if (!lastSeen) {
      return false;
    }

    const lastSeenTime = lastSeen.getTime();

    return (
      lastSeenTime <= now &&
      now - lastSeenTime < AdminService.ONLINE_THRESHOLD_MS
    );
  }
}