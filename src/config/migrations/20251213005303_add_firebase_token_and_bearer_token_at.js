/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('mst_account', function(table) {
    table.string('firebase_token').nullable();
    table.string('bearer_token').nullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('mst_account', function(table) {
    table.dropColumn('firebase_token');
    table.dropColumn('bearer_token');
  });
};
