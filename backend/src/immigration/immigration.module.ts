import { Module } from '@nestjs/common';
import { ImmigrationController } from './immigration.controller';
import { ImmigrationService } from './immigration.service';
import { PrismaModule } from '../prisma/prisma.module'; // Ajuste le chemin si nécessaire

@Module({
  imports: [PrismaModule],
  controllers: [ImmigrationController],
  providers: [ImmigrationService],
  exports: [ImmigrationService], 
})
export class ImmigrationModule {}