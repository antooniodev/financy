export interface UserCredentials {
    email: string;
    password: string;
}
export interface UserResponseBody {
    userId: string;
    firstName: string;
    monthlyGoal: number;
}
export interface UserAuthenticatedBody {
    user: UserResponseBody;
    token: string;
}
