const request = require("supertest");
const gameServer = require("../api/server.js");
const gamesdb = require("../database/dbConfig.js");

describe("games-router.js", () => {
  //   afterEach(async () => {
  //     await gamesdb("games").truncate();
  //   });

  describe("GET /", () => {
    it("should respond with 200 OK", () => {
      return request(gameServer)
        .get("/games")
        .then(response => {
          expect(response.status).toBe(200);
        });
    });

    it("should return JSON", () => {
      return request(gameServer)
        .get("/games")
        .then(res => {
          expect(res.type).toBe("application/json");
        });
    });

    it("should return the game object", () => {
      let game = [
        {
          id: 1,
          title: "Pacman",
          genre: "Arcade",
          releaseYear: 1980
        }
      ];

      return request(gameServer)
        .get("/games")
        .then(res => {
          expect(res.body).toEqual(game);
        });
    });
  });
});
