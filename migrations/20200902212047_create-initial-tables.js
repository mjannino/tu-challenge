
exports.up = function(knex) {
  return knex.schema.createTable("tu_records", tbl => {
    tbl.increments("_id").notNullable()
    tbl.string("value1").notNullable()
    tbl.float("value2").notNullable()
    tbl.boolean("value3").notNullable()
    /**
     * This creates two columns:
     * created_at
     * updated_at
     * 
     * They are different than the challenge's spec of 
     * creationDate and lastModificationDate
     * but those can be user-facing names
     */
    tbl.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.dropTableIfExists("tu_records")
};


/**
 *  Requirements:
 * 
    _id: A unique record ID (this will generally be automatically generated by your preferred database)
    timestamp : The unix time, in milliseconds, that the record was created
    value1: A string
    value2: A float
    value3: A boolean
    creationDate: The unix timestamp, in milliseconds, that the record was first saved to the database
    lastModificationDate: The unix timestamp, in milliseconds, of the last time the record was modified

 */