import {
  Controller,
  Body,
  UseGuards,
  Query,
  Get,
  ClassSerializerInterceptor,
  UseInterceptors,
  Logger,
  Req,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidateLimitPipe, ValidatePagePipe } from 'src/utils/pipe/list.pipe';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@Controller('users')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post('create')
  create(@Req() request: any, @Body() createUserDto: CreateUserDto) {
    return this.usersService.create(request.user.username, createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  findProfile(@Req() request: any) {
    return this.usersService.findProfile(request.user.username);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post('profile')
  updateProfile(@Req() request: any, @Body() updateUserProfileDto: UpdateUserProfileDto) {
    return this.usersService.updateProfile(request.user.username, updateUserProfileDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post('profile_4a')
  updateProfile4Admin(
    @Req() request: any,
    @Query('username') updateUsername: string,
    @Body() updateUserProfileDto: UpdateUserProfileDto,
  ) {
    return this.usersService.updateProfile4Admin(request.user.username, updateUsername, updateUserProfileDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Post('password')
  updatePassword(@Req() request: any, @Body() updateUserPasswordDto: UpdateUserPasswordDto) {
    return this.usersService.updatePassword(request.user.username, updateUserPasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('list')
  findAllWithPage(@Query('page', ValidatePagePipe) page: number, @Query('limit', ValidateLimitPipe) limit: number) {
    return this.usersService.findAllWithPage(page, limit);
  }

  @Post('remove')
  remove(@Query('username') username: string) {
    return this.usersService.remove(username);
  }
}
