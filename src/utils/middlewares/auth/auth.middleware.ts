import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../../../users/services/users/users.service';

interface UserPayload {
  id: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (req.cookies['user']) {
      const token = req.cookies['user'];
      const user = await this.usersService.validateJWT(token);
      req.currentUser = { id: user.sub };
    }
    next();
  }
}
