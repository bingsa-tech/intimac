import { Module } from '@nestjs/common';
import { ImmigrationController } from './immigration.controller';
import { ImmigrationService } from './immigration.service';

@Module({
  controllers: [ImmigrationController],
  providers: [ImmigrationService]
})
export class ImmigrationModule {}
