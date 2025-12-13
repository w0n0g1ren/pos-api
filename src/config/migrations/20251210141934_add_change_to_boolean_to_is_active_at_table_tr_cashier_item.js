/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table('tr_cashier_item', function(table) {
    table.dropColumn('is_active');
  }).then(function() {
    return knex.schema.table('tr_cashier_item', function(table) {
      table.boolean('is_active').defaultTo(true);
    });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('tr_cashier_item', function(table) {
    table.dropColumn('is_active');
  }).then(function() {
    return knex.schema.table('tr_cashier_item', function(table) {
      table.boolean('is_active').defaultTo(true);
    });
  });
};
