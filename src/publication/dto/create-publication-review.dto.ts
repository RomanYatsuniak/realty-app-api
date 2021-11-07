import {IsNotEmpty, Max, Min, MinLength} from "class-validator";

export class CreatePublicationReviewDto {
    @MinLength(10)
    reviewText: string;

    @Min(1)
    @Max(5)
    rating: number;
}
