import {
  Controller,
  Body,
  Patch,
  UseGuards,
  Query,
  Get,
  ClassSerializerInterceptor,
  UseInterceptors,
  Logger,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  findProfile(@Req() request: any) {
    return this.usersService.findProfile(request.user.username);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  updateProfile(@Req() request: any, @Body() updateUserProfileDto: UpdateUserProfileDto) {
    return this.usersService.updateProfile(request.user.username, updateUserProfileDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('password')
  updatePassword(@Query('username') username: string, @Body() updateUserProfileDto: UpdateUserProfileDto) {
    return this.usersService.updateProfile(username, updateUserProfileDto);
  }
}
