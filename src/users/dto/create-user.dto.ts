import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserGender } from '../entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsString()
  realname: string;

  @IsEnum(UserGender)
  gender: UserGender;
}
