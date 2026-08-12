import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Rendu global pour être accessible dans toute l'application sans réimportation
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Exporte le service pour les autres modules
})
export class PrismaModule {}