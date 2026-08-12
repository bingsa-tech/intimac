import { 
  Controller, 
  Post, 
  Get, 
  Patch, 
  Body, 
  Param, 
  Query, 
  Req, 
  UseGuards 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppointmentsService } from './appointments.service';
import { AppointmentStatus } from '@prisma/client';

@Controller('appointments')
@UseGuards(AuthGuard('jwt')) // Protège l'ensemble des routes avec JWT
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  // 1. Créer un rendez-vous (Élève)
  @Post()
  async create(
    @Req() req: any,
    @Body() body: { advisorId: string; date: string; notes?: string },
  ) {
    return this.appointmentsService.create({
      studentId: req.user.id,
      advisorId: body.advisorId,
      date: new Date(body.date),
      notes: body.notes,
    });
  }

  // 2. Créneaux disponibles (A placer avant les routes :id)
  @Get('available-slots')
  async getAvailableSlots(
    @Query('advisorId') advisorId: string,
    @Query('date') date: string,
  ) {
    return this.appointmentsService.getAvailableSlots(advisorId, date);
  }

  // 3. Mes rendez-vous (Étudiant connecté)
  @Get('my-appointments')
  async getMyAppointments(@Req() req: any) {
    return this.appointmentsService.findByStudent(req.user.id);
  }

  // 4. Tous les rendez-vous (Administration)
  @Get('admin/all')
  async getAllAppointmentsForAdmin() {
    return this.appointmentsService.findAll();
  }

  // 5. Mise à jour du statut d'un rendez-vous
  @Patch(':id/status')
  async updateAppointmentStatus(
    @Param('id') id: string,
    @Body('status') status: AppointmentStatus,
    @Body('meetingUrl') meetingUrl?: string,
  ) {
    return this.appointmentsService.updateStatus(id, status, meetingUrl);
  }

  // 6. Route dynamique avec :id (TOUJOURS EN DERNIER)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    // Si vous n'avez pas de méthode findOne dans le service, 
    // cette route peut être retirée ou ajustée.
    return { id }; 
  }
}