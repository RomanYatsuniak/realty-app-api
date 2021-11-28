import { IsInt, IsNotEmpty, IsOptional, Min, MinLength } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class CreateReservationDto {
  @PrimaryGeneratedColumn()
  rentId: number;

  @IsNotEmpty()
  rentedFrom: Date;

  @IsNotEmpty()
  rentedTo: Date;

  @IsNotEmpty()
  personCount: number;
}
