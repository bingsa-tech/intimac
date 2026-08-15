import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardStats() {
    const [students, advisors, admins] = await Promise.all([
      this.prisma.user.count({
        where: {
          role: Role.STUDENT,
        },
      }),

      this.prisma.user.count({
        where: {
          role: Role.ADVISOR,
        },
      }),

      this.prisma.user.count({
        where: {
          role: Role.ADMIN,
        },
      }),
    ]);

    return {
      students,
      advisors,
      admins,
      totalUsers: students + advisors + admins,
    };
  }
}