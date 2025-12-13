/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('mst_account', function(table) {
    table.increments('id').primary();
    table.string('account_name').notNullable();
    table.string('account_password').notNullable();
    table.string('account_photo_profile').notNullable();
    table.boolean('is_active').defaultTo(true);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('mst_account');
};
