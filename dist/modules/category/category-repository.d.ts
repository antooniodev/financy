import { Category, CategoryChart, CategoryRequestBody } from './category-entity';
export declare class CategoryRepository {
    getCategoriesByPeriodAndType(userId: string, type: boolean, startDate: string, endDate: string): Promise<CategoryChart[]>;
    getAllCategoriesByType(type: boolean): Promise<{
        id: string;
        title: string;
        type: boolean;
    }[]>;
    getOne(id: string): Promise<Category>;
    postOne(dto: CategoryRequestBody): Promise<string>;
    putOne(id: string, dto: CategoryRequestBody): Promise<string>;
    deleteOne(id: string): Promise<void>;
}
