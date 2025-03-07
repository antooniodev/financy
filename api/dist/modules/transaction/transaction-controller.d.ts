import { NextFunction, Request, Response } from 'express';
export declare class TransactionController {
    list(req: Request, res: Response, next: NextFunction): Promise<void>;
    listOne(req: Request, res: Response, next: NextFunction): Promise<void>;
    create(req: Request, res: Response, next: NextFunction): Promise<void>;
    edit(req: Request, res: Response, next: NextFunction): Promise<void>;
    delete(req: Request, res: Response, next: NextFunction): Promise<void>;
    listMetrics(req: Request, res: Response, next: NextFunction): Promise<void>;
}
