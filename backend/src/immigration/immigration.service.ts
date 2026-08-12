import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ImmigrationStatus } from '@prisma/client';

@Injectable()
export class ImmigrationService {
  constructor(private prisma: PrismaService) {}

  // Modèles d'étapes selon le pays
  private roadmapsTemplates = {
    Canada: [
      { order: 1, title: 'Obtenir une admission', description: 'En fonction du dossier académique et du matching, nous déposons votre parcours et effectuons le paiement auprès des universités pour garantir votre place.' },
      { order: 2, title: 'Obtenir la CAQ / Attestation', description: 'Demande de Certificat d’Acceptation du Québec ou attestation provinciale.' },
      { order: 3, title: 'Permis d’Études (IRCC)', description: 'Soumission du dossier officiel sur le portail d’immigration Canada.' },
      { order: 4, title: 'Données Biométriques', description: 'Prendre rendez-vous au centre VFS Global pour la collecte des empreintes.' }, // 👈 Corrigé en order: 4
      { order: 5, title: 'Recherche de Logement & Billets', description: 'Réservation du billet d’avion et logement temporaire.' },
    ],
    France: [
      { order: 1, title: 'Procédure EEF (Campus France)', description: 'Validation du choix d’établissement sur la plateforme Etudes en France.' },
      { order: 2, title: 'Demande de Visa Long Séjour (VLS-TS)', description: 'Dépôt de la demande de visa auprès du consulat/TLScontact.' },
      { order: 3, title: 'Attestation d’Hébergement', description: 'Justificatif de logement pour les 3 premiers mois.' },
    ],
  };

  async generateRoadmapForUser(userId: string, country: string) {
    const templates = this.roadmapsTemplates[country] || this.roadmapsTemplates['Canada'];
    
    // Supprimer une éventuelle ancienne roadmap
    await this.prisma.immigrationStep.deleteMany({ where: { userId } });

    // Créer les étapes pour l'étudiant
    const stepsData = templates.map((step) => ({
      ...step,
      country,
      userId,
      status: ImmigrationStatus.NOT_STARTED,
    }));

    return this.prisma.immigrationStep.createMany({ data: stepsData });
  }

  async getUserRoadmap(userId: string) {
    return this.prisma.immigrationStep.findMany({
      where: { userId },
      orderBy: { order: 'asc' },
    });
  }

  async toggleStep(stepId: string, isCompleted: boolean) {
    return this.prisma.immigrationStep.update({
      where: { id: stepId },
      data: {
        status: isCompleted ? ImmigrationStatus.COMPLETED : ImmigrationStatus.IN_PROGRESS,
        completedAt: isCompleted ? new Date() : null,
      },
    });
  }
}