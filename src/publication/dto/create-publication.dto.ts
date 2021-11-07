import {IsEnum, IsNotEmpty, IsString, MinLength, ValidateIf} from "class-validator";
import {PublicationType} from "../../shared/types";
import {CreateRealtyDto} from "../../realty/dto/create-realty.dto";

export class CreatePublicationDto {
    @MinLength(5)
    publicationTitle: string;

    @MinLength(10)
    description: string;

    @IsNotEmpty()
    @IsEnum(PublicationType)
    publicationType: PublicationType;

    @IsNotEmpty()
    price: number;

    realty: CreateRealtyDto;
}
