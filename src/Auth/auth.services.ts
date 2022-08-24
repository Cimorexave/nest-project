import { ForbiddenException, Injectable } from "@nestjs/common";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import config from "config";

@Injectable () 
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) {}
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
            return {
                success: true,
                msg: `${user.firstName} Signed Up Successfully`,
                user
            }
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
        const user = await this.prisma.user.findUnique({
            where: {
                email : dto.email
            }
        })
        //If user doesn't exist; Throw Exception
        if (!user) throw new ForbiddenException("Credentials Don't exist")
        //Compare the password
        const passMatches = await argon.verify(user.hashedPassword, dto.password)
        //If the password doesn't math; Throw Exception
        if (!passMatches) throw new ForbiddenException("Credentials Incorrect");
        //Return the User
        return {
            success: true,
            msg: "Sign In Successfully",
            token: await this.signToken(user.id, user.email)
        };
    }

    //Signing JWT Token (user.id , user.email) => token: String
    signToken( userId: number, email: string ) : Promise<String> {

        const payload = {
            sub: userId,
            email
        }

        return this.jwt.signAsync(payload, {
            expiresIn: "20m",
            secret: config.JWT_SECRET
        })

    }

}
