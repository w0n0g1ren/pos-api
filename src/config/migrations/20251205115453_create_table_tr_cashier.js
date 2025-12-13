/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('tr_cashier', function(table) {
    table.increments('id').primary().notNullable();
    table.string('transaction_code').notNullable();
    table.integer('total_amount').notNullable();
    table.integer('payment_amount').notNullable();
    table.integer('change_amount').notNullable();
    table.integer('cashier_id').unsigned().notNullable()
      .references('id').inTable('mst_employee')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    table.string('is_active').notNullable();
    table.timestamps(true, true);
  })
  .createTable('tr_cashier_item', function(table) {
    table.increments('id').primary().notNullable();
    table.integer('item_id').unsigned().notNullable()
      .references('id').inTable('mst_item')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    table.integer('quantity').notNullable();
    table.integer('price').notNullable();
    table.integer('total_price').notNullable();
    table.string('is_active').notNullable();
    table.timestamps(true, true);
  });   
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTable("tr_cashier_item")
    .dropTable("tr_cashier");
};
