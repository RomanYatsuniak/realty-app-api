import {IsEmail, Min, MinLength} from "class-validator";

export class CreateAuthDto {
    @IsEmail()
    email: string;

    @MinLength(8)
    password: string;
}
