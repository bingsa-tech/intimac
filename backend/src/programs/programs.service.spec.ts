import { Test, TestingModule } from '@nestjs/testing';
import { ProgramsService } from './programs.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

// Mock de PrismaService
const mockPrismaService = {
  university: {
    findUnique: jest.fn(),
  },
  program: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('ProgramsService', () => {
  let service: ProgramsService;
  let prisma: typeof mockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProgramsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<ProgramsService>(ProgramsService);
    prisma = module.get(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('devrait retourner un programme s’il existe', async () => {
      const mockProgram = { id: '1', title: 'Data Science' };
      prisma.program.findUnique.mockResolvedValue(mockProgram);

      const result = await service.findOne('1');
      expect(result).toEqual(mockProgram);
    });

    it('devrait lever une NotFoundException si le programme n’existe pas', async () => {
      prisma.program.findUnique.mockResolvedValue(null);

      await expect(service.findOne('99')).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('devrait supprimer un programme existant', async () => {
      const mockProgram = { id: '1', title: 'Data Science' };
      prisma.program.findUnique.mockResolvedValue(mockProgram);
      prisma.program.delete.mockResolvedValue(mockProgram);

      const result = await service.remove('1');
      expect(result).toEqual(mockProgram);
      expect(prisma.program.delete).toHaveBeenCalledWith({ where: { id: '1' } });
    });
  });
});