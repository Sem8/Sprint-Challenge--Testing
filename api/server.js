const express = require('express');
const helmet = require('helmet');

const gamesRouter = require('../routers/games-router');

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.send(`Navigate to /games to view list of games`)
});

server.use('/games', gamesRouter);

module.exports = server;