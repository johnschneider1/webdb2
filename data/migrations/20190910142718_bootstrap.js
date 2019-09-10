exports.up = function(knex) {
  return knex.schema.createTable("cars", tbl => {
    tbl.increments();
    tbl
      .integer("vin")
      .unique()
      .notNullable();
    tbl.string("make", 128).notNullable();
    tbl.string("model", 128).notNullable();
    tbl.decimal("mileage").notNullable();
    tbl.string("transmissionType", 128).notNullable();
    tbl.string("statusOfTitle", 128);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
