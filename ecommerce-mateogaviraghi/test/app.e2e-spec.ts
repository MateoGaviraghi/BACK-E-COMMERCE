import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { RolesGuard } from '../src/guards/roles.guard';
import { Observable } from 'rxjs';
import { AuthGuard } from '../src/guards/auth.guard';
import { UserRepository } from '../src/Users/users.repository';
import { Users } from '../src/entities/Users.entity';



describe('AppController (e2e)', () => {
  let app: INestApplication;
 class mockRoleGuard extends RolesGuard {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      return true
  }
 }
 class mockAuthGuard  extends AuthGuard {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
      return true
  }
 }

 class mockUsersRepository extends UserRepository { async getUsers(page: number, limit: number): Promise<Partial<Users>[]> {
      return []
  }
 }
  


  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
     
    })
    .overrideGuard(AuthGuard)
    .useClass(mockAuthGuard)
    .overrideGuard(RolesGuard)
    .useClass(mockRoleGuard)
    .overrideProvider(UserRepository)
    .useClass(mockUsersRepository)
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

 describe('GET/ users', () => {
  it('Get /users/ returns an array of users with an OK status code',async () => {
   const req = await request(app.getHttpServer()).get('/users');
   console.log(req.body);
   expect(req.status).toBe(200)
   expect(req.body).toBeInstanceOf(Array)
  })
  it('throws a NotFoundException if the users is not found', async () => {
    
  })
});
});
