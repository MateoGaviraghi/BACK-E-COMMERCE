import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
      const getDate = () => {
        return new Date().toLocaleString('en-US', {
            timeZone: 'America/Argentina/Buenos_Aires'
        })
      }
      console.log(`${req.method} ${req.url} -Request time: ${getDate()}`);
      
      next()
    }
}

