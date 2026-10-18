import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
export const products = sqliteTable('products', {
 id: integer('id').primaryKey({autoIncrement:true}), name:text('name').notNull(), category:text('category').notNull(), description:text('description').notNull().default(''), priceCents:integer('price_cents').notNull(), imageKey:text('image_key'), available:integer('available',{mode:'boolean'}).notNull().default(true), visible:integer('visible',{mode:'boolean'}).notNull().default(true), version:integer('version').notNull().default(1), deletedAt:text('deleted_at'), updatedAt:text('updated_at').notNull(), updatedBy:text('updated_by').notNull(),
});
export const settings=sqliteTable('settings',{key:text('key').primaryKey(),value:text('value').notNull(),version:integer('version').notNull().default(1)});
