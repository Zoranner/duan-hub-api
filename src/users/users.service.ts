import { ForbiddenException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { User, UserRole } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        username: username,
        isActive: true,
      },
    });
  }

  async create(username: string, createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findOne(username);
    if (user.adminRole != UserRole.Admin) {
      throw new ForbiddenException('没有权限进行创建用户');
    }
    return this.usersRepository.save(createUserDto);
  }

  async findProfile(username: string): Promise<User> {
    const user = await this.findOne(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async updateProfile(username: string, updateUserProfileDto: UpdateUserProfileDto) {
    let user = await this.findOne(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    user.realname = updateUserProfileDto.realname;
    user.gender = updateUserProfileDto.gender;
    user = await this.usersRepository.save(user);
    return user;
  }

  async updateProfile4Admin(username: string, updateUsername: string, updateUserProfileDto: UpdateUserProfileDto) {
    let user = await this.findOne(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    let updateUser = null;
    if (updateUsername != username) {
      if (user.adminRole != UserRole.Admin) {
        throw new ForbiddenException('没有权限进行修改');
      }
      updateUser = await this.findOne(updateUsername);
    } else {
      updateUser = user;
    }
    if (!updateUser) {
      throw new NotFoundException('没有找到您要修改的用户');
    }
    updateUser.realname = updateUserProfileDto.realname;
    updateUser.gender = updateUserProfileDto.gender;
    updateUser = await this.usersRepository.save(updateUser);
    return updateUser;
  }

  async updatePassword(username: string, updateUserPasswordDto: UpdateUserPasswordDto) {
    let user = await this.findOne(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    user.password = updateUserPasswordDto.newPassword;
    user = await this.usersRepository.save(user);
    return user;
  }

  async findAllWithPage(page: number, limit: number) {
    const pageList = await this.usersRepository.find({
      select: {
        username: true,
        realname: true,
        signDate: true,
      },
      order: {
        signDate: 'DESC',
      },
      skip: limit * (page - 1),
      take: limit,
    });

    return { data: pageList, page: page, limit: limit };
  }

  async remove(username: string) {
    const user = await this.findOne(username);
    await this.usersRepository.remove(user);
    return undefined;
  }
}
