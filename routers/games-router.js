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

gamesRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  gamesdb("games")
    .where({ id })
    .first()
    .then(game => {
      if (game) {
        res.status(200).json(game);
      } else {
        res.status(404).json({ message: `Game not found` });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: `Error occurred while retrieving game: ${error}`
      });
    });
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

gamesRouter.delete("/:id", async (req, res) => {
  try {
    const count = await gamesdb("games")
      .where({ id: req.params.id })
      .del();
    if (count > 0) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: `Game not found` });
    }
  } catch (error) {
    res.status(500).json({
      error: `Error occurred while deleting this game: ${error}`
    });
  }
});

module.exports = gamesRouter;
