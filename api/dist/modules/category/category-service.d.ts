export declare class CategoryService {
    getSummaryOfCategoriesByPeriod(userId: string, type: boolean, starrtDate: string, endDate: string): Promise<import("./category-entity").CategoryChart[]>;
    findAllCategoriesByType(type: boolean): Promise<{
        id: string;
        title: string;
        type: boolean;
    }[]>;
}
