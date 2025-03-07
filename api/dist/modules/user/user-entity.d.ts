export type IUser = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
};
export type IRegisterUser = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    monthlyGoal: string;
};
export type IMonthlyGoal = {
    monthlyGoal: number;
    totalOfExpenses: number;
    percentageOfExpenses: number;
};
