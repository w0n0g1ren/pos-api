/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('mst_item', function(table){
    table.increments('id').primary().notNullable();
    table.string('item_code').notNullable();
    table.string('item_name').notNullable();
    table.integer('uom_id').unsigned().notNullable()
      .references('id').inTable('mst_uom')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    table.integer('price').notNullable();
    table.string('is_active').notNullable();
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("mst_item");
};
