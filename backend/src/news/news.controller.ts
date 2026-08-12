import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';

// Si vous avez un guard d'authentification/Admin (optionnel)
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { RolesGuard } from '../auth/guards/roles.guard';

@Controller('news') // Génère la route /news
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  // Route publique : GET /news
  @Get()
  findAll() {
    return this.newsService.findAll();
  }

  // Route publique : GET /news/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }

  // Route protégée : POST /news
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  // Route protégée : PATCH /news/:id
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNewsDto: UpdateNewsDto) {
    return this.newsService.update(id, updateNewsDto);
  }

  // Route protégée : DELETE /news/:id
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.newsService.remove(id);
  }
}