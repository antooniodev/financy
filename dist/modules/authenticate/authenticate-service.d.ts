import { UserAuthenticatedBody } from './authenticate-entity';
import 'dotenv/config';
export declare class AuthenticateService {
    createSession(email: string, password: string): Promise<UserAuthenticatedBody>;
}
