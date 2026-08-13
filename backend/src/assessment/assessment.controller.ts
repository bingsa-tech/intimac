import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { CreateAssessmentDto, CreateAssessmentRequestDto } from './dto/create-assessment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';

@Controller('assessments')
export class AssessmentController {
  constructor(private readonly assessmentService: AssessmentService) {}

  // ==========================================
  // 1. ROUTE PUBLIQUE : DEMANDE GUEST (Widget)
  // ==========================================
  @Public()
  @Post('request')
  async createRequest(@Body() dto: CreateAssessmentRequestDto) {
    return this.assessmentService.createAssessmentRequest(dto);
  }

  // ==========================================
  // 2. ROUTE PUBLIQUE : FORMULAIRE COMPLÉTÉ PAR TOKEN
  // ==========================================
  @Public()
  @Post('guest')
  async createGuest(
    @Query('token') token: string,
    @Body() dto: CreateAssessmentDto,
  ) {
    return this.assessmentService.createGuestAssessment(token, dto);
  }

  // ==========================================
  // 3. ADMIN : RÉCUPÉRER TOUTES LES DEMANDES
  // (Prend en compte ?status=PENDING envoyé par Vue.js)
  // ==========================================
  @UseGuards(JwtAuthGuard)
  @Get('requests')
  async findAllRequests(@Query('status') status?: string) {
    return this.assessmentService.findAllRequests(status);
  }

  // ==========================================
  // 4. ADMIN : APPROUVER UNE DEMANDE GUEST
  // ==========================================
  @UseGuards(JwtAuthGuard)
  @Patch('requests/:id/approve')
  async approveRequest(@Param('id') id: string) {
    return this.assessmentService.approveRequest(id);
  }

  // ==========================================
  // 5. ADMIN : REJETER UNE DEMANDE GUEST
  // ==========================================
  @UseGuards(JwtAuthGuard)
  @Patch('requests/:id/reject')
  async rejectRequest(@Param('id') id: string) {
    return this.assessmentService.rejectRequest(id);
  }

  // ==========================================
  // 6. USER CONNECTÉ : CRÉER ET VOIR SES ÉVALUATIONS
  // ==========================================
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() dto: CreateAssessmentDto) {
    return this.assessmentService.create(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllByUser(@Request() req) {
    return this.assessmentService.findAllByUser(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.assessmentService.findOne(id, req.user.id);
  }
}