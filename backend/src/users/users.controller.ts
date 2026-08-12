import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards 
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 🔒 Seul un ADMIN connecté peut créer un utilisateur (ex: Conseiller / Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // 🔓 Récupérer tous les utilisateurs
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // 🔓 Récupérer uniquement les conseillers (Rôle ADVISOR) pour le formulaire de RDV
  // ⚠️ Doit impérativement rester AVANT @Get(':id')
  @Get('advisors')
  async getAdvisors() {
    return this.usersService.findAdvisors();
  }

  // 🔓 Récupérer un utilisateur par son ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  // ✏️ Mettre à jour un utilisateur
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  // 🗑️ Supprimer un utilisateur
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}