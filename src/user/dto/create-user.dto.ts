import {IsEmail, IsNotEmpty, IsOptional, IsString, Min, MinLength} from "class-validator";
import {CreateAuthDto} from "../../auth/dto/create-auth.dto";

export class CreateUserDto {
    @IsString()
    @MinLength(2)
    name: string;

    @MinLength(3)
    surname: string;

    @MinLength(9)
    phoneNumber: string;

    @IsOptional()
    avatarUrl: string;

    @MinLength(10)
    description: string;

    auth: CreateAuthDto;
    // @IsEmail()
    // email: string;
    //
    // @MinLength(8)
    // password: string;
}
