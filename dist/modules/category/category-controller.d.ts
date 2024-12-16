import { NextFunction, Request, Response } from 'express';
export default class CategoryController {
    list(req: Request, res: Response, next: NextFunction): Promise<void>;
    listOne(req: Request, res: Response, next: NextFunction): Promise<void>;
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    update(req: Request, res: Response, next: NextFunction): Promise<void>;
    delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}
