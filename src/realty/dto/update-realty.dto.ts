import { PartialType } from '@nestjs/mapped-types';
import { CreateRealtyDto } from './create-realty.dto';

export class UpdateRealtyDto extends PartialType(CreateRealtyDto) {}
