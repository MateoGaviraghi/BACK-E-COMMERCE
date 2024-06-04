import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { Users } from '../entities/Users.entity';
import { CreateUserDto } from '../Dtos/CreateUserDto.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
  
  
  async getUsers(page: number, limit: number): Promise<Partial<Users>[]>  {
    return  await this.userRepository.getUsers(page, limit)
  }
  
  getUserById(id: string): Promise<Omit<Users, 'password'>>  {
    return this.userRepository.getById(id)
  }
  
  // createUser(createUserDto: CreateUserDto): Promise<Users> {
  //   return this.userRepository.createUser(createUserDto);
  // }
  
  putUserById(id: string, updateUser: CreateUserDto): Promise<string> {
    return this.userRepository.putUserById(id, updateUser)
  }
  
  deleteUser(id: string): Promise<string> {
    return this.userRepository.deleteUser(id)
  }
  

 
}

