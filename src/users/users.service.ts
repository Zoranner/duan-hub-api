import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserProfileDto } from './dto/update-user-profile.dto';
import { User } from './entities/user.entity';

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

  async findProfile(username: string): Promise<User> {
    const user = await this.findOne(username);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async updateProfile(username: string, updateUserProfileDto: UpdateUserProfileDto) {
    let user = await this.findOne(username);
    if (!user) {
      throw new NotFoundException();
    }
    user.realname = updateUserProfileDto.realname;
    user.gender = updateUserProfileDto.gender;
    user = await this.usersRepository.save(user);
    return user;
  }
}
