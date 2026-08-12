import { PartialType } from '@nestjs/swagger';
import { CreateProvinceDto } from './province.dto';

export class UpdateProvinceDto extends PartialType(CreateProvinceDto) {}