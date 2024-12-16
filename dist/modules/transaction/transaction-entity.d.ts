export type Transaction = {
    id: string;
    title: string;
    date: Date;
    value: number;
    category: {
        id: string;
        title?: string;
        color?: string;
    };
    type: boolean;
    user_id?: string;
    created_at?: Date;
    updated_at?: Date;
};
export type TransactionRequestBody = {
    title: string;
    date: Date;
    value: number;
    categoryId: string;
    type: boolean;
};
