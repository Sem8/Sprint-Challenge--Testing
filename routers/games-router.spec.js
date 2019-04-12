const request = require("supertest");
const gameServer = require("../api/server.js");
const gamesdb = require("../database/dbConfig.js");

describe("games-router.js", () => {
  afterEach(async () => {
    await gamesdb("games").truncate();
  });

  describe.skip("GET /", () => {
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

    it.skip("should return empty array", () => {
      let game = [];

      return request(gameServer)
        .get("/games")
        .then(res => {
          expect(res.body).toEqual(game);
        });
    });
  });

  describe("post(/games)", () => {
    it("should return status 201", async () => {
      const testGame = {
        title: "Mario",
        genre: "Arcade",
        releaseYear: 1981
      };

      let response = await request(gameServer)
        .post("/games")
        .send(testGame);
      expect(response.status).toBe(201);
    });

    it("return the new game", async () => {
      const testGame = {
        title: "Mario",
        genre: "Arcade",
        releaseYear: 1981
      };

      let response = await request(gameServer)
        .post("/games")
        .send(testGame);
      expect(response.body).toEqual([
        {
          id: 1,
          title: "Mario",
          genre: "Arcade",
          releaseYear: 1981
        }
      ]);
    });

    it("return sttus 422 if information is incomplete", async () => {
      const testGame = {
        genre: "Arcade",
        releaseYear: 1981
      };
      let response = await request(gameServer)
        .post("/games")
        .send(testGame);
      expect(response.status).toBe(422);
    });
  });
});
