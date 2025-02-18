import { Transaction, TransactionRequestBody } from './transaction-entity';
export declare class TransactionService {
    findOne(id: string, userId: string): Promise<Transaction>;
    findMany(user_id: string, startDate: string, endDate: string, page: number, limit: number, orderBy: string): Promise<import("./transaction-entity").TransactionWithPagination>;
    create(userId: string, dto: TransactionRequestBody): Promise<string>;
    update(id: string, userId: string, dto: TransactionRequestBody): Promise<string>;
    delete(id: string, user_id: string): Promise<void>;
    getMetrics(userId: string, startDate: string, endDate: string): Promise<{
        incomes: number;
        expenses: number;
        balance: number;
    }>;
}
