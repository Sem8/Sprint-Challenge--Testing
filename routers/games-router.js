const gamesRouter = require('express').Router();

gamesRouter.get('/', (req, res) => {
    res.send('Welcome to your Games center');
})


module.exports = gamesRouter;