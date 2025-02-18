export type UserCredentials = {
    email: string;
    password: string;
};
export type UserResponseBody = {
    userId: string;
    firstName: string;
    monthlyGoal: number;
};
export type UserAuthenticatedBody = {
    user: UserResponseBody;
    token: string;
};
