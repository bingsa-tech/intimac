import { Module } from '@nestjs/common';
import { MatchingsService } from './matchings.service';
import { MatchingsController } from './matchings.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Ajuste le chemin si besoin

@Module({
  imports: [PrismaModule],
  controllers: [MatchingsController],
  providers: [MatchingsService],
})
export class MatchingsModule {}