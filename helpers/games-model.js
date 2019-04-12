const gamesdb = require('../database/dbConfig.js');

module.exports = {
    getGames,
    getOneGame,
    addGame,
};

function getGames() {
    return gamesdb('games');
};

function getOneGame(id) {
    return gamesdb('games').where({ id }).first();
};

function addGame(game) {
    return gamesdb('games').insert(game).then(([id]) => this.getOneGame(id));
}