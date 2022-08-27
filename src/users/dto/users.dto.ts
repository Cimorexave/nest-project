import { IsNotEmpty, IsObject, IsString } from "class-validator";
import { Request } from "express";

export class userRequest extends Request {
    @IsObject()
    @IsNotEmpty()
    user: object
}
