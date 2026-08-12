import { Controller, Get, Post, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ImmigrationService } from './immigration.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // Ajuste selon le chemin de ton guard JWT

@Controller('immigration')
@UseGuards(JwtAuthGuard)
export class ImmigrationController {
  constructor(private readonly immigrationService: ImmigrationService) {}

  // 1. Récupérer la roadmap de l'étudiant connecté
  @Get('my-roadmap')
  async getMyRoadmap(@Request() req) {
    const userId = req.user.id || req.user.sub;
    return this.immigrationService.getUserRoadmap(userId);
  }

  // 2. Générer (ou réinitialiser) une roadmap pour l'étudiant connecté
  @Post('generate')
  async generateRoadmap(@Request() req, @Body('country') country: string) {
    const userId = req.user.id || req.user.sub;
    return this.immigrationService.generateRoadmapForUser(userId, country);
  }

  // 3. Marquer une étape comme complétée / non complétée
  @Patch('steps/:id')
  async toggleStep(
    @Param('id') stepId: string,
    @Body('isCompleted') isCompleted: boolean,
  ) {
    return this.immigrationService.toggleStep(stepId, isCompleted);
  }
}