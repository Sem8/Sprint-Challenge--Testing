const gamesRouter = require('express').Router();

const gamesdb = require('../database/dbConfig.js');

gamesRouter.get('/', (req, res) => {
    gamesdb('games').then(allGames => {
        res.status(200).json(allGames);
    }).catch(error => {
        res.status(500).json({
            message: `The game could not be retrieved: ${error}`
        });
    });

    // res.send('Welcome to your Games center');
});


module.exports = gamesRouter;