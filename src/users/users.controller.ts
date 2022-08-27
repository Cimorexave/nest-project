import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtGuard } from 'src/Auth/guards';
import { userRequest } from './dto';
import { UsersService } from './users.service';
import {User} from "../Auth/decorator/index";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@User() req: userRequest) {
    return req.user;
  }

}
