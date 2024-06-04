import { Injectable } from "@nestjs/common";

import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Users } from "../entities/Users.entity";
import { CreateUserDto } from "../Dtos/CreateUserDto.dto";





@Injectable()
export class UserRepository{
  constructor(@InjectRepository(Users) private usersRepository: Repository<Users>) {}
  
  
  
  async getUsers(page: number, limit: number): Promise<Partial<Users>[]>  {
    let users = await this.usersRepository.find();
    
    const start = (page -1) * limit;
    const end = start + +limit;
    
    users = users.slice(start, end);
    
    return users.map(({password, ...user}) => user);
  }
  
  async getById(id: string): Promise<Omit<Users, 'password'>> {
    const user = await this.usersRepository.findOne({
      where: {id}, relations: ['orders']
    })
    const {password, ...userWithoutPassword} = user
    return userWithoutPassword
  }
  
  async createUser(user: Partial<Users>): Promise<Partial<Users>>{
  const newUser = await this.usersRepository.save(user);

  const {password, ...userWithoutPassword} = newUser

  return userWithoutPassword
}
  
  async putUserById(id: string, updateUser: CreateUserDto): Promise<string> {
    const user = await this.usersRepository.findOne({ where: {id}})
    if (!user) {
        return null
     }   
     await this.usersRepository.update(id, updateUser)  
     return id
    }
    
    async deleteUser(id: string): Promise<string>  {
      const userFound = await this.usersRepository.findOne({where: {id}});
      await this.usersRepository.delete(userFound);
      return  userFound.id
    }
    
    async findByEmail(email: string): Promise<Users> {
      const user = await this.usersRepository.findOne({where: {email}});
      if(!user){
        return null
      }
      return user
    }

  }