import { CategoryRequestBody } from './category-entity';
export declare class CategoryService {
    findMany(userId: string, type: boolean): Promise<import("./category-entity").CategoryChart[]>;
    findOne(id: string, userId: string): Promise<import("./category-entity").Category>;
    create(userId: string, dto: CategoryRequestBody): Promise<string>;
    update(id: string, userId: string, dto: CategoryRequestBody): Promise<string>;
    delete(id: string, userId: string): Promise<void>;
}
