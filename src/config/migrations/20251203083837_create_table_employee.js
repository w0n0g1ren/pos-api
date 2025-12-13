/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('mst_employee', function(table){
    table.increments('id').primary().notNullable();
    table.string('employee_code').notNullable();
    table.string('employee_name').notNullable();
    table.string('email').nullable();
    table.string('phone').notNullable();
    table.string('address').notNullable();
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("mst_employee");
};
