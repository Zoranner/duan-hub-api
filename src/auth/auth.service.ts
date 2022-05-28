import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ServerConfig } from 'src/configs/server.config';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    // @Inject(forwardRef(()=> ClerksService))
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user: LoginUserDto) {
    let payload = {
      username: user.username,
    };
    return {
      token: this.jwtService.sign(payload),
      expiresIn: ServerConfig.expiresIn,
    };
  }
}
