import * as yup from 'yup';
declare const _default: {
    findParams: yup.ObjectSchema<{
        userId: string;
        type: NonNullable<boolean | undefined>;
    }, yup.AnyObject, {
        userId: undefined;
        type: undefined;
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
};
export default _default;
