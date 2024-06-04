import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Users } from '../entities/Users.entity';

describe('UsersService', () => {
  let service: UsersService;
  const mockUser: Users = {
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
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
