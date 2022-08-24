import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import config from "config";
import { PrismaService } from "src/prisma/prisma.service";
import { userInfo } from "os";

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy, 'jwt', ) {

    constructor(private prisma : PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration : false,
            secretOrKey: config.JWT_SECRET
        })
    }

    async validate(payload: {sub: number, email: string}) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub
            }
        })
        delete user.hashedPassword;
        return user;
    }

}