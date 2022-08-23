import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { userInfo } from "os";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable () 
export class AuthService {
    constructor(private prisma: PrismaService) {}
    async signUp(dto: AuthDto) {
        //Signing Up logic
        //Hashing Password
        const hashedPassword = await argon.hash(dto.password);

        //Save to Database
        try {

            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hashedPassword
                },
                // select: {
                //     id: true,
                //     email: true,
                //     createdAt: true
                // }
            })
            delete user.hashedPassword;
            
            //Return the User
            return user
        } catch(error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if(error.code === "P2002") {
                    throw new ForbiddenException("Credentials Taken")
                }
                throw error
            }
        }

    }

    async signIn(dto: AuthDto) {

        //Find the user in database by Email
        //If user doesn't exist; Throw Exception

        //Compare the password
        //If the password doesn't math; Throw Exception

        //Return the User

    }
}
