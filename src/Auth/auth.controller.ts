import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.services";
import { AuthDto } from "./dto";

@Controller("auth")
export class AuthController {
    constructor (private authService: AuthService) {}

    @Get("/signup") // Get -> auth/signup
    getSignUp () {
        return {
            success: true,
            msg: "Sign Up / Get"
        }
    }

    @Post("/signup") // Post -> auth/signup
    signUp(@Body() dto: AuthDto) {
        return {
            dto
        }
        // return this.authService.signUp()
    }

    @Post("/signin") // Post -> auth/login
    login() {
        return this.authService.signIn()
    }

}