import { PartialType } from '@nestjs/mapped-types';
import { CreateScholarshipDto } from './scholarship.dto';

export class UpdateScholarshipDto extends PartialType(CreateScholarshipDto) {}
