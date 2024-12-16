import * as yup from 'yup';
declare const _default: {
    body: yup.ObjectSchema<{
        title: string;
        value: number;
        type: string;
        date: Date;
        categoryId: string;
    }, yup.AnyObject, {
        title: undefined;
        value: undefined;
        type: undefined;
        date: undefined;
        categoryId: undefined;
    }, "">;
    findManyParams: yup.ObjectSchema<{
        userId: string;
        startDate: Date;
        endDate: Date;
    }, yup.AnyObject, {
        userId: undefined;
        startDate: undefined;
        endDate: undefined;
    }, "">;
};
export default _default;
