import { SQL, SQLWrapper } from 'drizzle-orm';
import { Transaction, TransactionRequestBody, TransactionWithPagination } from './transaction-entity';
import { AnyColumn } from 'drizzle-orm';
import { PgColumn } from 'drizzle-orm/pg-core';
import { ColumnBaseConfig } from 'drizzle-orm';
import { ColumnDataType } from 'drizzle-orm';
type IOrderObject = {
    [key: string]: {
        column: AnyColumn;
        order: (column: SQLWrapper | AnyColumn) => SQL<unknown> | PgColumn<ColumnBaseConfig<ColumnDataType, string>, {}, {}>;
    };
};
declare const orderObject: IOrderObject;
export declare class TransactionRepository {
    getAllInPeriod(userId: string, startDate: string, endDate: string, page: number, limit: number, orderBy: keyof typeof orderObject): Promise<TransactionWithPagination>;
    getOneById(id: string, userId: string): Promise<Transaction>;
    postOne(userId: string, dto: TransactionRequestBody): Promise<string>;
    putOne(id: string, userId: string, dto: TransactionRequestBody): Promise<string>;
    deleteOne(id: string, userId: string): Promise<void>;
    selectMetrics(userId: string, startDate: string, endDate: string): Promise<{
        [x: string]: unknown;
    }>;
}
export {};
