export type Category = {
    id: string;
    title: string;
    color: string;
    icon: string;
    type: boolean;
};
export type CategoryChart = {
    id: string;
    label: string;
    icon: string;
    color: string;
    value: number;
    spent_total: number;
};
export type CategoryResponse = {
    id: string;
    title: string;
    color: string;
    icon: string;
    type: boolean;
    totalValue: number;
    percentage: string;
};
export type CategoryRequestBody = {
    title: string;
    color: string;
    icon: string;
    type: boolean;
};
