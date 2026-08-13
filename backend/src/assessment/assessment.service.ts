import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssessmentDto, CreateAssessmentRequestDto } from './dto/create-assessment.dto';
import { DegreeLevel } from '@prisma/client';

@Injectable()
export class AssessmentService {
  constructor(private prisma: PrismaService) {}

  // ==========================================
  // 1. CRÉATION D'UNE DEMANDE D'INVITÉ (Widget)
  // ==========================================
  async createAssessmentRequest(dto: CreateAssessmentRequestDto) {
    return this.prisma.assessmentRequest.create({
      data: {
        fullName: dto.fullName,
        email: dto.email,
        country: dto.country,
        phone: dto.phone,
        status: 'PENDING',
      },
    });
  }

  // ==========================================
  // 2. CRÉATION POUR UTILISATEUR INSCRIT
  // ==========================================
  async create(userId: string, dto: CreateAssessmentDto) {
    const { federalCRS, federalEligible, quebecEligible, ontarioScore, bcPnpScore } =
      this.computeScores(dto);

    await this.prisma.assessment.deleteMany({
      where: { userId },
    });

    const assessment = await this.prisma.assessment.create({
      data: {
        userId,
        ...this.extractAssessmentData(dto),
        federalEligible,
        federalCrsScore: federalCRS,
        quebecEligible,
        ontarioScore,
        bcPnpScore,
      },
    });

    await this.generateRoadmap({ userId }, assessment);

    const roadmap = await this.prisma.immigrationStep.findMany({
      where: { userId },
      orderBy: { order: 'asc' },
    });

    return {
      ...assessment,
      roadmap,
    };
  }

  // ==========================================
  // 3. CRÉATION POUR CANDIDAT INVITÉ VIA TOKEN
  // ==========================================
  async createGuestAssessment(token: string, dto: CreateAssessmentDto) {
    // Recherche de la demande associée via le token/ID
    const request = await this.prisma.assessmentRequest.findUnique({
      where: { id: token },
    });

    if (!request) {
      throw new NotFoundException("Demande d'évaluation introuvable.");
    }

    const { federalCRS, federalEligible, quebecEligible, ontarioScore, bcPnpScore } =
      this.computeScores(dto);

    const assessment = await this.prisma.assessment.create({
      data: {
        assessmentRequestId: request.id,
        ...this.extractAssessmentData(dto),
        federalEligible,
        federalCrsScore: federalCRS,
        quebecEligible,
        ontarioScore,
        bcPnpScore,
      },
    });

    await this.generateRoadmap({ assessmentRequestId: request.id }, assessment);

    const roadmap = await this.prisma.immigrationStep.findMany({
      where: { assessmentRequestId: request.id },
      orderBy: { order: 'asc' },
    });

    return {
      ...assessment,
      roadmap,
    };
  }

  // ==========================================
  // 4. ADMIN & RECHERCHES
  // ==========================================
  async findAllRequests(status?: string) {
    return this.prisma.assessmentRequest.findMany({
      where: status ? { status: status.toUpperCase() as any } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  }

  async approveRequest(id: string) {
    const request = await this.prisma.assessmentRequest.findUnique({ where: { id } });
    if (!request) throw new NotFoundException('Demande introuvable.');

    return this.prisma.assessmentRequest.update({
      where: { id },
      data: { status: 'APPROVED' },
    });
  }

  async rejectRequest(id: string) {
    const request = await this.prisma.assessmentRequest.findUnique({ where: { id } });
    if (!request) throw new NotFoundException('Demande introuvable.');

    return this.prisma.assessmentRequest.update({
      where: { id },
      data: { status: 'REJECTED' },
    });
  }

  async findAllByUser(userId: string) {
    return this.prisma.assessment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const assessment = await this.prisma.assessment.findFirst({
      where: { id, userId },
    });
    if (!assessment) throw new NotFoundException('Évaluation introuvable.');
    return assessment;
  }

  // ==========================================
  // 5. GÉNÉRATION DE LA ROADMAP
  // ==========================================
  private async generateRoadmap(owner: { userId?: string; assessmentRequestId?: string }, assessment: any) {
    const { userId, assessmentRequestId } = owner;

    if (userId) {
      await this.prisma.immigrationStep.deleteMany({ where: { userId } });
    } else if (assessmentRequestId) {
      await this.prisma.immigrationStep.deleteMany({ where: { assessmentRequestId } });
    }

    const steps: Array<{
      userId?: string;
      assessmentRequestId?: string;
      order: number;
      title: string;
      description: string;
      estimatedCost?: number;
      requiredDocs?: string[];
      category?: string;
    }> = [];

    if (assessment.clbFrench < 7) {
      steps.push({
        userId,
        assessmentRequestId,
        order: 1,
        title: "Améliorer et valider le niveau de Français (TCF/TEF)",
        description: "Viser un niveau NCLC 7 (B2 avancé) pour débloquer le Québec et le bonus francophone Fédéral.",
        estimatedCost: 320,
        requiredDocs: ["Attestation TCF/TEF Canada"],
        category: "LANGUE",
      });
    }

    steps.push({
      userId,
      assessmentRequestId,
      order: 2,
      title: "Évaluation des Diplômes d'Études (ÉDE / WES)",
      description: "Faire reconnaître vos diplômes obtenus hors du Canada auprès d'un organisme désigné (ex: WES, ICAS).",
      estimatedCost: 240,
      requiredDocs: ["Diplômes originaux", "Relevés de notes universitaires"],
      category: "ADMINISTRATIF",
    });

    const proofOfFunds = 13757;
    steps.push({
      userId,
      assessmentRequestId,
      order: 3,
      title: "Préparer la Preuve de Fonds Soumis",
      description: `Pour l'Entrée Express, vous devez prouver disposer d'au moins ${proofOfFunds} $ CAD liquides et disponibles.`,
      estimatedCost: proofOfFunds,
      requiredDocs: ["Attestations bancaires officielles", "Historique de compte sur 6 mois"],
      category: "FINANCE",
    });

    if (assessment.quebecEligible) {
      steps.push({
        userId,
        assessmentRequestId,
        order: 4,
        title: "Soumettre une Déclaration d'Intérêt sur Arrima (Québec)",
        description: "Votre profil est favorable pour le Programme Sélection Travailleurs Qualifiés (PSTQ).",
        estimatedCost: 869,
        requiredDocs: ["CSQ Formulaire", "Pièces d'identité", "Preuves d'expérience"],
        category: "SOUMISSION",
      });
    } else if (assessment.federalEligible) {
      steps.push({
        userId,
        assessmentRequestId,
        order: 4,
        title: "Créer le Profil Entrée Express",
        description: "Soumettre votre profil dans le bassin Entrée Express (Volet Travailleurs Qualifiés Fédéral).",
        estimatedCost: 0,
        requiredDocs: ["Numéro ÉDE", "Numéro de test de langue"],
        category: "SOUMISSION",
      });
    }

    await this.prisma.immigrationStep.createMany({
      data: steps as any,
    });
  }

  // ==========================================
  // 6. CALCULS ET FONCTIONS PRIVÉES
  // ==========================================
  private computeScores(dto: CreateAssessmentDto) {
    const federalCRS = this.calculateFederalCRS(dto);
    const federalEligible = federalCRS >= 67;
    const quebecEligible = Boolean(
      (dto.quebecFrenchOral && dto.quebecFrenchOral >= 7) || dto.clbFrench >= 7,
    );
    const ontarioScore = this.calculateOntarioScore(dto);
    const bcPnpScore = this.calculateBcScore(dto);

    return { federalCRS, federalEligible, quebecEligible, ontarioScore, bcPnpScore };
  }

  private extractAssessmentData(dto: CreateAssessmentDto) {
    return {
      age: dto.age,
      educationLevel: dto.educationLevel as DegreeLevel,
      workExperienceYrs: dto.workExperienceYrs,
      clbFrench: dto.clbFrench,
      clbEnglish: dto.clbEnglish,
      teerCategory: dto.teerCategory,
      hasValidatedOffer: dto.hasValidatedOffer,
      quebecFrenchOral: dto.quebecFrenchOral ?? null,
      hasQuebecDegree: dto.hasQuebecDegree ?? false,
      quebecJobOfferRegion: dto.quebecJobOfferRegion ?? null,
      ontarioHourlyWage: dto.ontarioHourlyWage ?? null,
      isOutsideGTA: dto.isOutsideGTA ?? false,
      ontarioWorkExpYrs: dto.ontarioWorkExpYrs ?? 0,
      bcAnnualSalary: dto.bcAnnualSalary ?? null,
      bcRegionZone: dto.bcRegionZone ?? null,
      hasBcDegree: dto.hasBcDegree ?? false,
    };
  }

  private calculateFederalCRS(dto: CreateAssessmentDto): number {
    let score = 0;
    if (dto.age >= 18 && dto.age <= 35) score += 12;
    else if (dto.age > 35) score += Math.max(0, 12 - (dto.age - 35));

    const eduScores: Record<DegreeLevel, number> = {
      HIGH_SCHOOL: 5,
      CERTIFICATE: 15,
      DIPLOMA: 19,
      BACHELOR: 21,
      MASTER: 23,
      PHD: 25,
    };
    score += eduScores[dto.educationLevel] || 0;

    score += Math.min(dto.clbFrench * 2, 24);
    score += Math.min(dto.clbEnglish * 1, 12);
    score += Math.min(dto.workExperienceYrs * 3, 15);
    if (dto.hasValidatedOffer) score += 10;

    return score;
  }

  private calculateOntarioScore(dto: CreateAssessmentDto): number {
    let score = 0;
    if (dto.ontarioHourlyWage) {
      if (dto.ontarioHourlyWage >= 40) score += 10;
      else if (dto.ontarioHourlyWage >= 25) score += 5;
    }
    if (dto.isOutsideGTA) score += 10;
    if (dto.ontarioWorkExpYrs) score += Math.min(dto.ontarioWorkExpYrs * 3, 12);
    score += dto.clbFrench + dto.clbEnglish;
    return score;
  }

  private calculateBcScore(dto: CreateAssessmentDto): number {
    let score = 0;
    if (dto.bcAnnualSalary) {
      if (dto.bcAnnualSalary >= 100000) score += 50;
      else score += Math.floor(dto.bcAnnualSalary / 2500);
    }
    if (dto.hasBcDegree) score += 10;
    if (dto.bcRegionZone) score += dto.bcRegionZone * 5;
    return score;
  }
}