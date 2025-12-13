/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
return knex.schema.table('tr_cashier', function(table) {
    // 1. Hapus kolom lama
    table.dropColumn('is_active');
  }).then(function() {
    return knex.schema.table('tr_cashier', function(table) {
      // 2. Buat kolom baru dengan tipe boolean
      table.boolean('is_active').defaultTo(true);
    });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
return knex.schema.table('tr_cashier', function(table) {
    // 1. Hapus kolom lama
    table.dropColumn('is_active');
  }).then(function() {
    return knex.schema.table('tr_cashier', function(table) {
      // 2. Buat kolom baru dengan tipe boolean
      table.boolean('is_active').defaultTo(true);
    });
  });
};
