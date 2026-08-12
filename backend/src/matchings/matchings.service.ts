import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MatchRequestDto } from './dto/match-request.dto';

@Injectable()
export class MatchingsService {
  constructor(private readonly prisma: PrismaService) {}

  // 1. Calculer et historiser un matching
  async calculateMatches(dto: MatchRequestDto) {
    const programs = await this.prisma.program.findMany({
      include: {
        university: {
          include: {
            country: true,
            province: true,
            city: true,
          },
        },
        languages: true,
      },
    });

    const scoredPrograms = programs.map((program) => {
      let score = 0;
      const details = {
        gpaEligible: false,
        budgetEligible: false,
        languageEligible: false,
      };

      // GPA (40 pts)
      if (!program.minimumGpa || dto.gpa >= program.minimumGpa) {
        score += 40;
        details.gpaEligible = true;
      } else if (program.minimumGpa - dto.gpa <= 0.2) {
        score += 20;
      }

      // Budget (40 pts)
      if (program.tuition <= dto.maxBudget) {
        score += 40;
        details.budgetEligible = true;
      } else if (((program.tuition - dto.maxBudget) / dto.maxBudget) * 100 <= 15) {
        score += 20;
      }

      // Langues (20 pts)
      const programLangs = program.languages.map((l) => l.language.toLowerCase());
      const studentLangs = dto.languages.map((l) => l.toLowerCase());
      const hasCommonLanguage = programLangs.some((lang) => studentLangs.includes(lang));

      if (hasCommonLanguage || programLangs.length === 0) {
        score += 20;
        details.languageEligible = true;
      }

      return {
        matchScore: score,
        details,
        program,
      };
    });

    const validMatches = scoredPrograms
      .filter((result) => result.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore);

    if (dto.userId && validMatches.length > 0) {
      const matchEntries = validMatches.map((item) => ({
        userId: dto.userId!,
        programId: item.program.id,
        score: item.matchScore,
        recommendation: item.matchScore >= 80 
          ? 'Hautement recommandé' 
          : item.matchScore >= 50 
            ? 'Moyennement éligible' 
            : 'Éligibilité faible',
      }));

      await this.prisma.matching.createMany({
        data: matchEntries,
      });
    }

    return validMatches;
  }

  // 2. READ : Récupérer l'historique de matching d'un utilisateur spécifique
  async getUserHistory(userId: string) {
    return this.prisma.matching.findMany({
      where: { userId },
      include: {
        program: {
          include: {
            university: {
              include: {
                country: true,
                city: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  // 3. READ : Récupérer un enregistrement de matching par son ID
  async findOne(id: string) {
    const matching = await this.prisma.matching.findUnique({
      where: { id },
      include: {
        program: {
          include: {
            university: true,
          },
        },
        user: true,
      },
    });

    if (!matching) {
      throw new NotFoundException(`Matching avec l'ID "${id}" introuvable.`);
    }

    return matching;
  }

  // 4. DELETE : Supprimer une entrée d'historique de matching (ex: action "Retirer de mes recommandations")
  async remove(id: string) {
    await this.findOne(id); // Vérifie qu'il existe
    return this.prisma.matching.delete({
      where: { id },
    });
  }

  // 5. DELETE : Vider tout l'historique d'un utilisateur
  async clearUserHistory(userId: string) {
    return this.prisma.matching.deleteMany({
      where: { userId },
    });
  }
}