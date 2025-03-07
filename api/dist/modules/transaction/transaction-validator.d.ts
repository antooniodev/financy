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
        page: number;
        limit: number;
        startDate: string;
        endDate: string;
        orderBy: string;
    }, yup.AnyObject, {
        userId: undefined;
        page: undefined;
        limit: undefined;
        startDate: undefined;
        endDate: undefined;
        orderBy: undefined;
    }, "">;
    findMetricsParams: yup.ObjectSchema<{
        userId: string;
        startDate: string;
        endDate: string;
    }, yup.AnyObject, {
        userId: undefined;
        startDate: undefined;
        endDate: undefined;
    }, "">;
};
export default _default;
