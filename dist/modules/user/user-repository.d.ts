import { IUser, IRegisterUser } from './user-entity';
export declare class UserRepository {
    post(dto: IRegisterUser): Promise<string>;
    getOneByEmail(email: string): Promise<IUser>;
    getOneById(id: string): Promise<IUser>;
}
