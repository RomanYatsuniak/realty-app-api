import { IsNotEmpty, IsOptional, Min, MinLength } from 'class-validator';

export class CreateInfoToSellerDto {
  @IsNotEmpty()
  paymentType: string;

  @IsNotEmpty()
  plannedPurchasingDate: Date;
}
