import { Injectable } from "@nestjs/common";

@Injectable () 
export class AuthService {
    signUp() {
        //Signing Up logic
        

        //Sucessfull message return
        return {
            success: true,
            msg: "Signed up successfully"
        }

    }

    signIn() {

    }
}
