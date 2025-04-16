import { Pool } from "@neondatabase/serverless";
import { type NeonDatabase, drizzle } from "drizzle-orm/neon-serverless";

import * as schema from "./schema";

type DatabaseType = NeonDatabase<typeof schema> & {
	$client: Pool;
};

class DatabaseConnection {
	private static instance: DatabaseType;
	private constructor() {
		const pool = new Pool({
			connectionString: process.env.DATABASE_URL!,
		});
		DatabaseConnection.instance = drizzle(pool, { schema });
	}
	static getInstance(): DatabaseType {
		if (!DatabaseConnection.instance) new DatabaseConnection();
		return DatabaseConnection.instance;
	}
}

export const db = DatabaseConnection.getInstance();
