import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/Auth/guards';
import { UsersService } from './users.service';
import {User} from "../Auth/decorator/index";

// import { IsNotEmpty, IsObject } from "class-validator";
// import { Request } from "express";

// export class userRequest extends Request {
//     @IsObject()
//     @IsNotEmpty()
//     user: object
// }



@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@User() user: {id: number, email: string, hashedPassword: string}) {
    return user
  }

}
