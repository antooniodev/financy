export interface Category {
    id: string;
    title: string;
    color: string;
    icon: string;
    type: boolean;
}
export interface CategoryChart {
    id: string;
    label: string;
    icon: string;
    color: string;
    value: number;
    spent_total: number;
}
export interface CategoryResponse {
    id: string;
    title: string;
    color: string;
    icon: string;
    type: boolean;
    totalValue: number;
    percentage: string;
}
export interface CategoryRequestBody {
    title: string;
    color: string;
    icon: string;
    type: boolean;
}
