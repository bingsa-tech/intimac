import { Module } from '@nestjs/common';
import { ScholarshipService } from './scholarship.service';
import { ScholarshipController } from './scholarship.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Ajuste selon ton architecture

@Module({
  imports: [PrismaModule],
  controllers: [ScholarshipController],
  providers: [ScholarshipService],
})
export class ScholarshipModule {}