exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('grudges', function(table){
            table.increments('id').primary();
            table.string('name');
            table.string('offense');
            table.boolean('forgiven');
            table.integer('grudge_id')
                 .references('id')
                 .inTable('grudges');

            table.timestamps();
        })
    ])
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('grudges')
    ])
};
