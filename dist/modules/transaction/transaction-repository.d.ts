import { Transaction, TransactionRequestBody } from './transaction-entity';
export declare class TransactionRepository {
    getAllInPeriod(userId: string, startDate: Date, endDate: Date): Promise<Transaction[]>;
    getOneById(id: string, userId: string): Promise<Transaction>;
    postOne(userId: string, dto: TransactionRequestBody): Promise<string>;
    putOne(id: string, userId: string, dto: TransactionRequestBody): Promise<string>;
    deleteOne(id: string, userId: string): Promise<void>;
}
