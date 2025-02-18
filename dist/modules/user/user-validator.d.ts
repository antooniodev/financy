import * as yup from 'yup';
declare const _default: {
    body: yup.ObjectSchema<{
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }, yup.AnyObject, {
        firstName: undefined;
        lastName: undefined;
        email: undefined;
        password: undefined;
    }, "">;
    updateMonthlyGoal: yup.ObjectSchema<{
        userId: string;
        monthlyGoal: number;
    }, yup.AnyObject, {
        userId: undefined;
        monthlyGoal: undefined;
    }, "">;
    getMonthlyGoal: yup.ObjectSchema<{
        userId: string;
    }, yup.AnyObject, {
        userId: undefined;
    }, "">;
};
export default _default;
