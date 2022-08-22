import { Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.services";

@Controller("auth")
export class AuthController {
    constructor (private authService: AuthService) {}

    @Get("/signup") // Get -> auth/signup
    getSignUp () {
        this.authService.signup()
    }

    @Post("/signup") // Post -> auth/signup
    signUp() {

    }

    @Post("/signin") // Post -> auth/login
    login() {

    }

}