import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../Users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../Dtos/CreateUserDto.dto';
import { UserRepository } from '../Users/users.repository';
import { Users } from 'src/entities/Users.entity';

describe('AuthService', () => {
  let authService: AuthService;
let mockUsersService: Partial<UsersService>
let mockUsersRepository: Partial<UserRepository>
const mockHashPassword: string = '$2b$10$1cS6y1cPcL2VzNjnmC9C0.eR4OKu8QgN1AxJbL2OYBG02JcZgD/fS'

const mockUser: CreateUserDto = {
 
  name: 'Test User',
  email: 'test@example.com',
  password: 'TestPassword123!',
  confirmPassword: 'TestPassword123',
  address: '123 Test St',
  phone: 1234567890,
  isAdmin: false,
  country: 'Test Country',
  city: 'Test City',
};

const mockUserEntity: Users = {
  id: '7fd4ecf4-2489-4d49-aaf6-6a0e327a452d',
  name: 'Test User',
  email: 'test@example.com',
  password: 'TestPassword123!',
  address: '123 Test St',
  phone: 1234567890,
  isAdmin: false,
  country: 'Test Country',
  city: 'Test City',
  orders: [],
};
  beforeEach(async () => {

    mockUsersService = {
      
    }; 
    mockUsersRepository = {
      findByEmail: () =>  Promise.resolve(undefined),
      createUser: (user: Partial<Users>): Promise<Partial<Users>>=> Promise.resolve({
        ...user,
         password: mockHashPassword
      })
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
                 AuthService,
                 JwtService,
                 {
                  provide: UsersService,
                  useValue: mockUsersService
                 },
                 {
                  provide: UserRepository,
                  useValue: mockUsersRepository
                 }
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Create an instanse of AuthService', async ()=> {
    expect(authService).toBeDefined()
  })

  it('singup() creates a new user with an encripted password', async () => {
    const user = await authService.singUp(mockUser);
    expect(user).toBeDefined();
    expect(user.password).not.toEqual(mockUser.password)
  })

  it('singUP() throws an error if the email is already in use', async () => {
    mockUsersRepository.findByEmail = (email: string) => Promise.resolve(mockUserEntity as Users)

    try {
      await authService.singUp(mockUser as CreateUserDto)
    } catch (error) {
      expect(error.message).toEqual('el usuario ya esta registrado')
    }
  })

  it('singIn() returns as error if the password is invalid', async () => {
    mockUsersRepository.findByEmail = (email: string) =>
      Promise.resolve(mockUserEntity as Users)

    try {
      await authService.singin(mockUserEntity.email, 'INVALID PASSWORD')
    } catch (error) {
      expect(error.message).toEqual('Password invalidado')
    }
  })

  it ('singIn() returns an error if the users it not found', async () => {
    try {
      await authService.singin(mockUserEntity.email, mockUserEntity.password)
    } catch (error) {
      expect(error.message).toEqual('Usuario no econtrado')
    }
  }) 
});

