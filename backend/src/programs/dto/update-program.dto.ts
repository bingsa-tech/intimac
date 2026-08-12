import { PartialType } from '@nestjs/swagger';
import { CreateProgramDto } from './program.dto';

export class UpdateProgramDto extends PartialType(CreateProgramDto) {}