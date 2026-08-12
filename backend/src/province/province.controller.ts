import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProvinceService } from './province.service';
import { CreateProvinceDto } from './dto/province.dto';
import { UpdateProvinceDto } from './dto/update-province.dto';

@ApiTags('Provinces')
@Controller('provinces')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle province' })
  @ApiResponse({ status: 201, description: 'Province créée avec succès.' })
  @ApiResponse({ status: 404, description: 'Pays introuvable.' })
  create(@Body() createProvinceDto: CreateProvinceDto) {
    return this.provinceService.create(createProvinceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Récupérer toutes les provinces' })
  findAll() {
    return this.provinceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer une province par son ID' })
  @ApiResponse({ status: 200, description: 'Détails de la province.' })
  @ApiResponse({ status: 404, description: 'Province introuvable.' })
  findOne(@Param('id') id: string) {
    return this.provinceService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Mettre à jour une province' })
  update(
    @Param('id') id: string,
    @Body() updateProvinceDto: UpdateProvinceDto,
  ) {
    return this.provinceService.update(id, updateProvinceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer une province' })
  remove(@Param('id') id: string) {
    return this.provinceService.remove(id);
  }
}