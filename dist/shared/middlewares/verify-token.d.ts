import { NextFunction, Request, Response } from 'express';
import 'dotenv/config';
declare const verifyToken: (req: Request, res: Response, next: NextFunction) => void;
export default verifyToken;
