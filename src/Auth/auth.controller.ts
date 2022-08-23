import { Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.services";

@Controller("auth")
export class AuthController {
    constructor (private authService: AuthService) {}

    @Get("/signup") // Get -> auth/signup
    getSignUp () {
        return {
            success: true,
            msg: "Sign Up / Get. Send a post reqest to sign up a new user."
        }
    }

    @Post("/signup") // Post -> auth/signup
    signUp() {
        //Signing Up logic goes here; using the services.

        this.authService.signup()

        //Sucessfull message return
        return {
            success: true,
            msg: "Signed up successfully"
        }

    }

    @Post("/signin") // Post -> auth/login
    login() {

    }

}