import { IMonthlyGoal, IRegisterUser, IUser } from './user-entity';
export declare class UserService {
    findById(id: string): Promise<IUser>;
    create(dto: IRegisterUser): Promise<string>;
    updateMonthlyGoal(id: string, monthlyGoal: number): Promise<void>;
    getMonthlyGoal(id: string): Promise<IMonthlyGoal>;
}
