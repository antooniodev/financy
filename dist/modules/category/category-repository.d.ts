import { Category, CategoryChart, CategoryRequestBody } from './category-entity';
export declare class CategoryRepository {
    getCategoriesToChartByType(userId: string, type: boolean): Promise<CategoryChart[]>;
    getOne(id: string, userId: string): Promise<Category>;
    postOne(userId: string, dto: CategoryRequestBody): Promise<string>;
    putOne(id: string, userId: string, dto: CategoryRequestBody): Promise<string>;
    deleteOne(id: string, userId: string): Promise<void>;
}
