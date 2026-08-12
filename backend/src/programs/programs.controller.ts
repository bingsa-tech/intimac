import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProgramsService } from './programs.service';
import { CreateProgramDto, FilterProgramsDto, UpdateProgramDto } from './dto/program.dto';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('programs')
@ApiBearerAuth('access-token')
@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Créer un programme (ADMIN)' })
  create(@Body() createProgramDto: CreateProgramDto) {
    return this.programsService.create(createProgramDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister et filtrer les programmes' })
  findAll(@Query() filters: FilterProgramsDto) {
    return this.programsService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir un programme par son ID' })
  findOne(@Param('id') id: string) {
    return this.programsService.findOne(id);
  }

 @Patch(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Mettre à jour un programme (ADMIN)' })
  update(@Param('id') id: string, @Body() updateProgramDto: UpdateProgramDto) {
    return this.programsService.update(id, updateProgramDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Supprimer un programme (ADMIN)' })
  remove(@Param('id') id: string) {
    return this.programsService.remove(id);
  }
}