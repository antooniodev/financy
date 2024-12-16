import * as schema from './schema';
import postgres from 'postgres';
export declare const client: postgres.Sql<{}>;
export declare function testConnection(): Promise<void>;
export declare const db: import("drizzle-orm/postgres-js").PostgresJsDatabase<typeof schema> & {
    $client: postgres.Sql<{}>;
};
