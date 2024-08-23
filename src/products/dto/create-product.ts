import { IsByteLength, IsDateString, IsEmail, isNumber, IsNumber, IsString } from "class-validator";

export class CreateProduct {
   @IsString()
    name: string;

    @IsNumber()
    quantity: string;

    @IsNumber()
    price: number;

    @IsString()
    application: string;

    @IsString()
    balance: string;

    @IsDateString()
    dateOfPurchase: Date;

    @IsNumber()
    purshaseRequest: number;

    @IsNumber()
    whintorCode: number;

    @IsString()
    details: string;

    @IsString()
    archive_link: string;
}
