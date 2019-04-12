
exports.up = function(knex, Promise) {
    return knex.schema.createTable('games', gamesTbl => {
        gamesTbl.increments();

        gamesTbl.string('title').notNullable().unique();
        gamesTbl.string('genre').notNullable();
        gamesTbl.date('releaseYear');
    });
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('games');  
};
