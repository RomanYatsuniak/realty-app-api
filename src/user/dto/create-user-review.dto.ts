import {IsEmail, IsNotEmpty, IsOptional, IsString, Max, Min, MinLength} from "class-validator";

export class CreateUserReviewDto {
    @IsString()
    @MinLength(20)
    description: string;

    @Min(0)
    @Max(5)
    rating: number;

    @Min(1)
    userId: number;
}
