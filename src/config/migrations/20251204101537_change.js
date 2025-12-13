const { table } = require("../database");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('mst_item', function(table) {
    table.boolean('is_active').notNullable().defaultTo(true).alter();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('mst_item', function(table) {
    table.boolean('is_active').notNullable().defaultTo(true).alter();
  })
};
