import { type AnyColumn, sql } from "drizzle-orm";
import { timestamp } from "drizzle-orm/pg-core";

export const lifeCycleDates = {
	createdAt: timestamp("createdAt").notNull().defaultNow(),
	updatedAt: timestamp("updatedAt")
		.defaultNow()
		.$onUpdate(() => new Date()),
};

export const increment = (column: AnyColumn, value: number) => {
	return sql`${column} + ${value}`;
};

export const decrement = (column: AnyColumn, value: number) => {
	return sql`${column} - ${value}`;
};
