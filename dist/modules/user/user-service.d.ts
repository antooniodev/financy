import { IRegisterUser, IUser } from './user-entity';
export declare class UserService {
    findById(id: string): Promise<IUser>;
    create(dto: IRegisterUser): Promise<string>;
}
