import { Injectable, BadRequestException, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AppointmentStatus } from '@prisma/client';

@Injectable()
export class AppointmentsService {
  constructor(private readonly prisma: PrismaService) {}

  // 1. Créer un rendez-vous (Demandé par l'étudiant)
  async create(data: { date: Date; studentId: string; advisorId: string; notes?: string }) {
    const appointmentDate = new Date(data.date);

    if (appointmentDate < new Date()) {
      throw new BadRequestException('La date du rendez-vous doit être dans le futur.');
    }

    const existingAppointment = await this.prisma.appointment.findFirst({
      where: {
        advisorId: data.advisorId,
        date: appointmentDate,
        status: { not: AppointmentStatus.CANCELLED },
      },
    });

    if (existingAppointment) {
      throw new ConflictException('Ce créneau horaire est déjà réservé pour ce conseiller.');
    }

    return this.prisma.appointment.create({
      data: {
        date: appointmentDate,
        studentId: data.studentId,
        advisorId: data.advisorId,
        notes: data.notes,
        status: AppointmentStatus.PENDING,
      },
      include: {
        advisor: { select: { id: true, email: true, firstName: true, lastName: true } },
        student: { select: { id: true, email: true, firstName: true, lastName: true } },
      },
    });
  }

  // 2. Récupérer les RDV d'un étudiant
  async findByStudent(studentId: string) {
    return this.prisma.appointment.findMany({
      where: { studentId },
      include: { advisor: { select: { id: true, email: true, firstName: true, lastName: true } } },
      orderBy: { date: 'asc' },
    });
  }

  // 3. Récupérer les RDV d'un conseiller
  async findByAdvisor(advisorId: string) {
    return this.prisma.appointment.findMany({
      where: { advisorId },
      include: { student: { select: { id: true, email: true, firstName: true, lastName: true } } },
      orderBy: { date: 'asc' },
    });
  }

  // 4. Récupérer TOUS les RDV (Pour l'administrateur)
async findAll() {
  return this.prisma.appointment.findMany({
    include: {
      student: { 
        select: { firstName: true, lastName: true, email: true } 
      },
      advisor: { 
        select: { firstName: true, lastName: true, email: true } 
      },
    },
    orderBy: { date: 'desc' },
  });
}

  // 5. Mettre à jour le statut
  async updateStatus(id: string, status: AppointmentStatus, meetingUrl?: string) {
    const appointment = await this.prisma.appointment.findUnique({ where: { id } });
    if (!appointment) throw new NotFoundException('Rendez-vous introuvable');

    return this.prisma.appointment.update({
      where: { id },
      data: {
        status,
        ...(meetingUrl && { meetingUrl }),
      },
    });
  }

  // 6. Récupérer les créneaux disponibles
  async getAvailableSlots(advisorId: string, dateParam: string | Date) {
    const targetDate = new Date(dateParam);
    
    const startOfDay = new Date(targetDate); 
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(targetDate); 
    endOfDay.setHours(23, 59, 59, 999);

    const existingAppointments = await this.prisma.appointment.findMany({
      where: {
        advisorId,
        date: { gte: startOfDay, lte: endOfDay },
        status: { not: AppointmentStatus.CANCELLED },
      },
      select: { date: true },
    });

    const allSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

    return allSlots.map((time) => {
      const isBooked = existingAppointments.some((app) => {
        const appTime = new Date(app.date).toISOString().substring(11, 16);
        return appTime === time;
      });

      return {
        time,
        isAvailable: !isBooked,
      };
    });
  }
}