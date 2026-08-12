import { PartialType } from '@nestjs/swagger';
import { CreateSubscriptionDto } from './subscription.dto';

export class UpdateSubscriptionDto extends PartialType(CreateSubscriptionDto) {}