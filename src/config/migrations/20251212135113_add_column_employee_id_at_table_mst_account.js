/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable('mst_account', function(table) {
    table.integer('employee_id').unsigned()
      .references('id').inTable('mst_employee')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('mst_account', function(table) {
    table.dropColumn('employee_id');
  });
};
