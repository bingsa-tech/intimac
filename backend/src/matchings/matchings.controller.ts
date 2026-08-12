import { Controller, Post, Get, Delete, Body, Param, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { MatchingsService } from './matchings.service';
import { MatchRequestDto } from './dto/match-request.dto';

@ApiTags('matchings')
@Controller('matchings')
export class MatchingsController {
  constructor(private readonly matchingsService: MatchingsService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Calculer et historiser l’éligibilité des programmes' })
  @ApiResponse({ status: 200, description: 'Liste des programmes scorés' })
  getMatches(@Body() matchRequestDto: MatchRequestDto) {
    return this.matchingsService.calculateMatches(matchRequestDto);
  }

  @Get('history/:userId')
  @ApiOperation({ summary: 'Récupérer l’historique des matchings d’un utilisateur' })
  @ApiParam({ name: 'userId', description: 'ID de l’utilisateur' })
  getUserHistory(@Param('userId') userId: string) {
    return this.matchingsService.getUserHistory(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un matching spécifique par son ID' })
  @ApiParam({ name: 'id', description: 'ID du matching' })
  findOne(@Param('id') id: string) {
    return this.matchingsService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un enregistrement de matching par son ID' })
  @ApiParam({ name: 'id', description: 'ID du matching' })
  remove(@Param('id') id: string) {
    return this.matchingsService.remove(id);
  }

  @Delete('history/:userId')
  @ApiOperation({ summary: 'Effacer tout l’historique de matching d’un utilisateur' })
  @ApiParam({ name: 'userId', description: 'ID de l’utilisateur' })
  clearUserHistory(@Param('userId') userId: string) {
    return this.matchingsService.clearUserHistory(userId);
  }
}