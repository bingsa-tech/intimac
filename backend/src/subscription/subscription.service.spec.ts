import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionsService } from './subscription.service';
import { PrismaService } from '../prisma/prisma.service';
import { SubscriptionPlan, SubscriptionStatus } from '@prisma/client';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

describe('SubscriptionsService', () => {
  let service: SubscriptionsService;
  let prisma: PrismaService;

  // Mock du service Prisma
  // typed as any to avoid strict mock typing issues in tests
  const mockPrismaService: any = {
    subscription: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubscriptionsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<SubscriptionsService>(SubscriptionsService);
    prisma = module.get<PrismaService>(PrismaService);

    jest.clearAllMocks();
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('devrait créer un abonnement avec succès', async () => {
      const dto = {
        userId: 'user-123',
        plan: SubscriptionPlan.PREMIUM,
        status: SubscriptionStatus.ACTIVE,
        startDate: '2026-01-01T00:00:00.000Z',
        endDate: '2027-01-01T00:00:00.000Z',
      };

      mockPrismaService.subscription.findUnique.mockResolvedValue(null);
      mockPrismaService.subscription.create.mockResolvedValue({ id: 'sub-1', ...dto });

      const result = await service.create(dto);

      expect(result).toHaveProperty('id', 'sub-1');
      expect(prisma.subscription.create).toHaveBeenCalledTimes(1);
    });

    it('devrait lever une ConflictException si l’utilisateur a déjà un abonnement', async () => {
      const dto = {
        userId: 'user-123',
        plan: SubscriptionPlan.PREMIUM,
        status: SubscriptionStatus.ACTIVE,
        startDate: '2026-01-01T00:00:00.000Z',
        endDate: '2027-01-01T00:00:00.000Z',
      };

      mockPrismaService.subscription.findUnique.mockResolvedValue({ id: 'sub-existing' });

      await expect(service.create(dto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findOne', () => {
    it('devrait retourner un abonnement par son ID', async () => {
      const mockSub = { id: 'sub-1', plan: SubscriptionPlan.PREMIUM };
      mockPrismaService.subscription.findUnique.mockResolvedValue(mockSub);

      const result = await service.findOne('sub-1');
      expect(result).toEqual(mockSub);
    });

    it('devrait lever une NotFoundException si l’abonnement n’existe pas', async () => {
      mockPrismaService.subscription.findUnique.mockResolvedValue(null);

      await expect(service.findOne('invalid-id')).rejects.toThrow(NotFoundException);
    });
  });
});