var supertest = require("supertest")(require("../../src/app"));
var expect = require("chai").expect;
var model = require("../../src/models/Pokemon");

describe("Routes", function () {
  beforeEach(function () {
    model.reset();
  });

  describe("/", function () {
    it("GET responds with an array of pokemons", function () {
      return supertest
        .get("/")
        .expect(200)
        .expect("Content-Type", /json/)
        .expect(function (res) {
          expect(res.body).to.eql([]);
        });
    });

    it("POST adds a new pokemon and returns the object of the created pokemon", function () {
      return supertest // supertest nos permite hacer y testear requests HTTP
        .post("/pokemons/pokemons") // hacemos un request HTTP: POST a '/'
        .send({
          name: PokePrueba,
          hp: 2,
          speed: 321,
          attack: 43,
          defense: 3,
          weight: 2,
          height: 2,
        })
        .expect(200) // el codigo de status del response
        .expect("Content-Type", /json/) // podemos testear los headers
        .expect(function (res) {
          expect(res.body).to.eql({}); // testeo la respuesta con el body
          expect(model.pokemons()).to.have.length(1);
        });
    });
  });
});
