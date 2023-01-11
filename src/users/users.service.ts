import {
  ConflictException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  PreconditionFailedException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { User, RightRole } from './entities/user.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User> {
    if (!username) {
      throw new PreconditionFailedException('输入的参数有误');
    }
    return await this.usersRepository.findOne({
      where: {
        username: username,
        isActive: true,
      },
    });
  }

  async create(username: string, createUserDto: CreateUserDto): Promise<User> {
    const user = await this.findOne(username);
    if (user.rightRole != RightRole.Admin) {
      throw new ForbiddenException('没有权限创建用户');
    }
    const addUser = await this.findOne(createUserDto.username);
    if (addUser) {
      throw new ConflictException('用户名已存在');
    }
    return await this.usersRepository.save(createUserDto);
  }

  async findAllWithPage(page: number, limit: number) {
    const pageList = await this.usersRepository.find({
      where: {
        rightRole: RightRole.Normal,
      },
      select: {
        username: true,
        realname: true,
        gender: true,
        createTime: true,
      },
      order: {
        createTime: 'DESC',
      },
      skip: limit * (page - 1),
      take: limit,
    });

    return { data: pageList, page: page, limit: limit };
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
      if (user.rightRole != RightRole.Admin) {
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

  async remove(username: string) {
    const user = await this.findOne(username);
    if (!user) {
      throw new NotFoundException('没有找到要修改的用户名');
    }
    await this.usersRepository.remove(user);
    return undefined;
  }
}
