import { CategoryChart } from './category-entity';
export declare class CategoryRepository {
    getCategoriesByPeriodAndType(userId: string, type: boolean, startDate: string, endDate: string): Promise<CategoryChart[]>;
    getAllCategoriesByType(type: boolean): Promise<{
        id: string;
        title: string;
        type: boolean;
    }[]>;
}
