import { NextFunction, Request, Response } from 'express';
import { Error as PostgresError } from 'postgres';
declare const handleError: (error: PostgresError, request: Request, response: Response, _: NextFunction) => Response<any, Record<string, any>>;
export default handleError;
