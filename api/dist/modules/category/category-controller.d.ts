import { NextFunction, Request, Response } from 'express';
export default class CategoryController {
    listSummaryCategories(req: Request, res: Response, next: NextFunction): Promise<void>;
    listAllCategories(req: Request, res: Response, next: NextFunction): Promise<void>;
}
