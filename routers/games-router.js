const gamesRouter = require("express").Router();

const gamesdb = require("../database/dbConfig.js");
const Games = require("../helpers/games-model.js");

gamesRouter.get("/", (req, res) => {
  gamesdb("games")
    .then(allGames => {
      res.status(200).json(allGames);
    })
    .catch(error => {
      res.status(500).json({
        message: `The game could not be retrieved: ${error}`
      });
    });

  // res.send('Welcome to your Games center');
});

gamesRouter.post("/", async (req, res) => {
  const { title, genre, releaseYear } = req.body;
  if (!title) {
    res
      .status(422)
      .json({ message: `Bad request, submit all requried fields` });
  } else {
    try {
      const newGame = req.body;
      Games.addGame(newGame).then(game => {
        res.status(201).json(game);
      });
    } catch (error) {
      res.status(500).json({
        error: `There was an error while saving game to the database: ${error}`
      });
    }
  }
});

module.exports = gamesRouter;
