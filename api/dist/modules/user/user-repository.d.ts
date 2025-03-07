import { IUser, IRegisterUser, IMonthlyGoal } from './user-entity';
export declare class UserRepository {
    post(dto: IRegisterUser): Promise<string>;
    getOneByEmail(email: string): Promise<IUser>;
    getOneById(id: string): Promise<IUser>;
    getMonthlyGoal(id: string, startDate: string, endDate: string): Promise<IMonthlyGoal>;
    updateMonthlyGoal(id: string, monthlyGoal: number): Promise<void>;
}
