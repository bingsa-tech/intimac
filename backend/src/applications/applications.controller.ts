import { 
  Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Request 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; // Assurez-vous d'importer le bon AuthGuard pour JWT
import { ApplicationsService } from './applications.service';


@Controller('applications')
@UseGuards(AuthGuard('jwt')) // 🛡️ Protège toutes les routes du contrôleur
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  // 1. CRÉER une candidature pour l'étudiant connecté
  @Post()
  create(@Request() req, @Body() body: { programId: string; motivation?: string }) {
    const userId = req.user.id; // Récupéré du JWT
    return this.applicationsService.create({ ...body, userId });
  }

  // 2. LIRE toutes les candidatures de l'étudiant connecté
  @Get('my-applications')
  findMyApplications(@Request() req) {
    const userId = req.user.id;
    return this.applicationsService.findByUser(userId);
  }

  // 3. MODIFIER une candidature (si elle lui appartient)
  @Patch(':id')
  update(
    @Request() req, 
    @Param('id') id: string, 
    @Body() body: { motivation?: string }
  ) {
    return this.applicationsService.update(id, req.user.id, body);
  }

  // 4. SUPPRIMER une candidature (si elle lui appartient)
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.applicationsService.remove(id, req.user.id);
  }
}