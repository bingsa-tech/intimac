import { PartialType } from '@nestjs/swagger';
import { CreateCityDto } from './city.dto';

export class UpdateCityDto extends PartialType(CreateCityDto) {}