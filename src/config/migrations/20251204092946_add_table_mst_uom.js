/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('mst_uom', function(table){
    table.increments('id').primary().notNullable();
    table.string('uom_code').notNullable();
    table.string('uom_name').notNullable();
    table.string('is_active').notNullable();
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
