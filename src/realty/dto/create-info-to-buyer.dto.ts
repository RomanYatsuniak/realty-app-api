import { IsNotEmpty, IsOptional, Min, MinLength } from 'class-validator';

export class CreateInfoToBuyerDto {
  @IsNotEmpty()
  registrationNumber: string;

  @IsNotEmpty()
  flourNumber: number;

  @IsNotEmpty()
  streetName: string;

  @IsNotEmpty()
  realtyCondition: string;

  @IsNotEmpty()
  buildingNumber: number;
}
