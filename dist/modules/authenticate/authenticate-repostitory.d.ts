import { UserCredentials, UserResponseBody } from './authenticate-entity';
export declare class AuthenticateRepository {
    getUserByEmail({ email, password, }: UserCredentials): Promise<UserResponseBody>;
}
