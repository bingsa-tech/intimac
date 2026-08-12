import { Module } from '@nestjs/common';
import { UniversitiesController } from './universite.controller';
import { UniversitiesService } from './universite.service';

@Module({
  controllers: [UniversitiesController],
  providers: [UniversitiesService]
})
export class UniversiteModule {}
