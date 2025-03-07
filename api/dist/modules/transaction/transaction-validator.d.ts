import * as yup from 'yup';
declare const _default: {
    create: yup.ObjectSchema<{
        title: string;
        value: number;
        type: string;
        date: Date;
        categoryId: string;
        userId: string;
    }, yup.AnyObject, {
        title: undefined;
        value: undefined;
        type: undefined;
        date: undefined;
        categoryId: undefined;
        userId: undefined;
    }, "">;
    edit: yup.ObjectSchema<{
        title: string;
        value: number;
        type: string;
        date: Date;
        categoryId: string;
        userId: string;
        id: string;
    }, yup.AnyObject, {
        title: undefined;
        value: undefined;
        type: undefined;
        date: undefined;
        categoryId: undefined;
        userId: undefined;
        id: undefined;
    }, "">;
    remove: yup.ObjectSchema<{
        userId: string;
        id: string;
    }, yup.AnyObject, {
        userId: undefined;
        id: undefined;
    }, "">;
    findMany: yup.ObjectSchema<{
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
    findOne: yup.ObjectSchema<{
        userId: string;
        id: string;
    }, yup.AnyObject, {
        userId: undefined;
        id: undefined;
    }, "">;
    findMetrics: yup.ObjectSchema<{
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
