import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../Dtos/CreateUserDto.dto';
import { UserRepository } from '../Users/users.repository';
import { Role } from './roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async getAuth() {
    return 'get all Auth';
  }

  async singin(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const userPayload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      roles: [user.isAdmin ? Role.Admin : Role.User],
    };
    console.log(userPayload);

    const token = this.jwtService.sign(userPayload);

    return { success: 'Logged in user', token };
  }
  async singUp(user: CreateUserDto) {
    const { email, password } = user;

    const foundUser = await this.userRepository.findByEmail(email);

    if (foundUser) {
      throw new BadRequestException('the user is already registered');
    }

    const hashedPassowrd = await bcrypt.hash(password, 10);
    console.log(user);

    delete user.confirmPassword;

    return await this.userRepository.createUser({
      ...user,
      password: hashedPassowrd,
    });
  }
}
