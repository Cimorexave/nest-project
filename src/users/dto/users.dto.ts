import { IsNotEmpty, IsString } from "class-validator";

export class userRequest extends Request {
    @IsString()
    @IsNotEmpty()
    user: object
}
