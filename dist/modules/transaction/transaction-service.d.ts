import { Transaction, TransactionRequestBody } from './transaction-entity';
export declare class TransactionService {
    findOne(id: string, userId: string): Promise<Transaction>;
    findMany(user_id: string, startDate: Date, endDate: Date): Promise<Transaction[]>;
    create(userId: string, dto: TransactionRequestBody): Promise<string>;
    update(id: string, userId: string, dto: TransactionRequestBody): Promise<string>;
    delete(id: string, user_id: string): Promise<void>;
}
