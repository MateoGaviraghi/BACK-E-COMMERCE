import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';


// function validateRequest(request: Request) {
//   const authorizationHeader = request.headers.authorization;

//   if (!authorizationHeader || !/^Basic:\s\S+$/.test(authorizationHeader)) {
//     return false; 
//   }

//   const token = authorizationHeader.split(' ')[1]; 
//   return token === '1234'; 
// }



@Injectable()
export class AuthGuard implements CanActivate {

constructor(private readonly jwtSerive: JwtService){}

 canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {



    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1] ?? ''; 

   if(!token) {
    throw new UnauthorizedException('bearer token not found')
   }

   try {
    const secret = process.env.JWT_SECRET;
    const payload = this.jwtSerive.verify(token, {secret})
    request.user = payload;
    
    
    return true
   } catch (error) {
    throw new UnauthorizedException('invalid token')
   }
  }
}
