export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}
export interface IRegisterUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    monthlyGoal: string;
}
export interface IMonthlyGoal {
    monthlyGoal: number;
    totalOfExpenses: number;
    percentageOfExpenses: number;
}
