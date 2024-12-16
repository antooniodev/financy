import { UserAuthenticatedBody } from './authenticate-entity';
export declare class AuthenticateService {
    createSession(email: string, password: string): Promise<UserAuthenticatedBody>;
}
