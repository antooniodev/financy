import * as yup from 'yup';
declare const _default: {
    getSummary: yup.ObjectSchema<{
        userId: string;
        type: NonNullable<boolean | undefined>;
        startDate: string;
        endDate: string;
    }, yup.AnyObject, {
        userId: undefined;
        type: undefined;
        startDate: undefined;
        endDate: undefined;
    }, "">;
    findAll: yup.ObjectSchema<{
        type: NonNullable<boolean | undefined>;
        userId: string;
    }, yup.AnyObject, {
        type: undefined;
        userId: undefined;
    }, "">;
};
export default _default;
