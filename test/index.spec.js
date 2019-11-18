var request = require("supertest");
var app = require('../index');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

describe('api', () => {

  beforeEach(async () => {
    await database.raw('truncate table papers cascade');

    let paper = {
      title: 'Alternate Endings for Game of Thrones, Season 8',
      author: 'Literally Anyone',
      publisher: 'Not George R. R. Martin'
    };

    await database('papers').insert(paper, 'id');
   });

  afterEach(() => {
    database.raw('truncate table papers cascade');
  });


  describe('Test the root path', () => {
    it('It should respond to the GET method', async () => {
      const res = await request(app).get("/");

      expect(res.statusCode).toBe(200);
    });
  });

  describe('Test GET /api/v1/papers path', () => {
    it('happy path', async () => {
      const res = await request(app).get("/api/v1/papers");

      expect(res.statusCode).toBe(200);
      expect(res.body.length).toBe(1);

      expect(res.body[0]).toHaveProperty('title');
      expect(res.body[0].title).toBe('Alternate Endings for Game of Thrones, Season 8');

      expect(res.body[0]).toHaveProperty('author');
      expect(res.body[0].author).toBe('Literally Anyone');

      expect(res.body[0]).toHaveProperty('publisher');
      expect(res.body[0].publisher).toBe('Not George R. R. Martin');
    });
  });
});
