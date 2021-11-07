import {IsNotEmpty, IsOptional, Min, MinLength} from "class-validator";

export class CreateRealtyDto {
    @Min(1)
    numberOfRooms: number;

    @IsNotEmpty()
    area: number;

    @IsNotEmpty()
    wallMaterial: string;

    @MinLength(2)
    city: string;

    @MinLength(2)
    address: string;

    @IsOptional()
    minNumberOfPersons: number;

    @IsOptional()
    maxNumberOfPersons: number
}
