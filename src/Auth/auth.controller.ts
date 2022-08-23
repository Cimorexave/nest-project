import { Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.services";

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
    signUp() {
        return this.authService.signUp()
    }

    @Post("/signin") // Post -> auth/login
    login() {
        return this.authService.signIn()
    }

}