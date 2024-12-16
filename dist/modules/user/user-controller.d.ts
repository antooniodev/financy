import { NextFunction, Request, Response } from 'express';
export declare class UserController {
    register(req: Request, res: Response, next: NextFunction): Promise<void>;
    listById(req: Request, res: Response, next: NextFunction): Promise<void>;
}
export default UserController;
