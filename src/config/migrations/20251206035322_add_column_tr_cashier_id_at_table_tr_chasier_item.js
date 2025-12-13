/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('tr_cashier_item', function(table) {
    table.integer('tr_cashier_id').unsigned().notNullable()
      .references('id').inTable('tr_cashier')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('tr_cashier_item', function(table) {
    table.dropColumn('tr_cashier_id');
  });
};
