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
    bodyPost: yup.ObjectSchema<{
        title: string;
        color: string;
        icon: string;
        type: NonNullable<boolean | undefined>;
    }, yup.AnyObject, {
        title: undefined;
        color: undefined;
        icon: undefined;
        type: undefined;
    }, "">;
    bodyPut: yup.ObjectSchema<{
        title: string;
        color: string;
        icon: string;
    }, yup.AnyObject, {
        title: undefined;
        color: undefined;
        icon: undefined;
    }, "">;
    findAllParams: yup.ObjectSchema<{
        type: NonNullable<boolean | undefined>;
        userId: string;
    }, yup.AnyObject, {
        type: undefined;
        userId: undefined;
    }, "">;
};
export default _default;
