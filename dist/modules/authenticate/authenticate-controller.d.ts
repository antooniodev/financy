import { NextFunction, Request, Response } from 'express';
export declare class AuthenticateController {
    createSession(req: Request, res: Response, next: NextFunction): Promise<void>;
}
