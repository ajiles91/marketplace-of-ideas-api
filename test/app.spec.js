const knex = require('knex')
const app = require('../src/app')
require('dotenv').config();

describe('App', () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, world!')
  })
})

describe('Marketplace Of Ideas API:', function () {
  let db;
  let ideas = [
    { "id": 1,
    "ideaname": 'some name1',
    "ideasummary": 'some summary1',
    "authorname": 'some name',
    "email":'name@email.com',
    "claimed":false,
    "submitted": true,
   },
    { "id": 2,
    "ideaname": 'some name2',
    "ideasummary": 'some summary2',
    "authorname": 'some name2',
    "email":'name2@email.com',
    "claimed":false,
    "submitted": true,
    }
  ]

  before('make knex instance', () => {  
    db = knex ({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  });
  
  before('cleanup', () => db.raw('TRUNCATE TABLE ideas RESTART IDENTITY;'));

  afterEach('cleanup', () => db.raw('TRUNCATE TABLE ideas RESTART IDENTITY;')); 

  after('disconnect from the database', () => db.destroy()); 

  describe('GET /api', () => {

    beforeEach('insert some ideas', () => {
      return db('ideas').insert(ideas);
    })

    it('should respond to GET `/api` with an array of ideas and status 200', function () {
      return supertest(app)
        .get('/api')
        .expect(200)
        .expect(res => {
          expect(res.body).to.be.a('array');
          expect(res.body).to.have.length(ideas.length);
          res.body.forEach((idea) => {
            expect(idea).to.be.a('object');
            expect(idea).to.include.keys('id', 'ideaname', 'ideasummary', 'authorname', 'email', 'claimed', 'submitted');
          });
        });
    });

  });

  
  describe.only('GET /api/idea/:id', () => {

    beforeEach('insert some ideas', () => {
      return db('ideas').insert(ideas);
    })

    it('should return correct idea when given an id', () => {
      let doc;
      return db('ideas')
        .first()
        .then(_doc => {
          doc = _doc
          return supertest(app)
            .get(`/api/idea/${doc.id}`)
            .expect(200);
        })
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body).to.include.keys('id', 'ideaname', 'ideasummary', 'authorname', 'email', 'claimed', 'submitted');
          expect(res.body.id).to.equal(doc.id);
          expect(res.body.ideaname).to.equal(doc.ideaname);
          expect(res.body.ideasummary).to.equal(doc.ideasummary);
          expect(res.body.authorname).to.equal(doc.authorname);
          expect(res.body.email).to.equal(doc.email);
          expect(res.body.claimed).to.equal(doc.claimed);
          expect(res.body.submitted).to.equal(doc.submitted);
        });
    });

    it('should respond with a 404 when given an invalid id', () => {
      return supertest(app)
        .get('/api/idea/aaaaaaaaaaaa')
        .expect(404);
    });
    
  });

  
  describe('POST /api/idea', function () {

    it('should create and return a new todo when provided valid data', function () {
      const newIdea = { 
        "id": 5,
        "ideaname": 'some name5',
        "ideasummary": 'some summary5',
        "authorname": 'some name5',
        "email":'name5@email.com',
        "claimed":false,
        "submitted": true,
     }

      return supertest(app)
        .post('/api/idea')
        .send(newIdea)
        .expect(201)
        .expect(res => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('id', 'ideaname', 'ideasummary', 'authorname', 'email', 'claimed', 'submitted');
          expect(res.body.id).to.equal(doc.id);
          expect(res.body.ideaName).to.equal(doc.ideaName);
          expect(res.body.ideaSummary).to.equal(doc.ideaSummary);
          expect(res.body.authorName).to.equal(doc.authorName);
          expect(res.body.email).to.equal(doc.email);
          expect(res.body.claimed).to.equal(doc.claimed);
          expect(res.body.submitted).to.equal(doc.submitted);
          // expect(res.body.completed).to.be.false;
          expect(res.headers.location).to.equal(`/api/idea/${res.body.id}`)
        });
    });

    it('should respond with 400 status when given bad data', function () {
      const badIdea = {
        foobar: 'broken item'
      };
      return supertest(app)
        .post('/api/idea')
        .send(badIdea)
        .expect(400);
    });

  });

  
  describe('PATCH /api/idea/:id', () => {

    beforeEach('insert some ideas', () => {
      return db('marketplace-of-ideas-test').insert(ideas);
    })

    it('should update idea when given valid data and an id', function () {
      const idea = {
        'claimed': 'true'
      };
      
      let doc;
      return db('marketplace-of-ideas-test')
        .first()
        .then(_doc => {
          doc = _doc
          return supertest(app)
            .patch(`/api/idea/${doc.id}`)
            .send(idea)
            .expect(200);
        })
        .then(res => {
          expect(res.body).to.be.a('object');
          expect(res.body).to.include.keys('id', 'ideaname', 'ideasummary', 'authorname', 'email', 'claimed', 'submitted');
          expect(res.body.ideaName).to.equal(item.ideaName);
          expect(res.body.claimed).to.be.false;
        });
    });

    it('should respond with 400 status when given bad data', function () {
      const badIdea = {
        foobar: 'broken item'
      };
      
      return db('makretplace-of-ideas-test')
        .first()
        .then(doc => {
          return supertest(app)
            .patch(`/api/idea/${doc.id}`)
            .send(badIdea)
            .expect(400);
        })
    });

    it('should respond with a 404 for an invalid id', () => {
      const idea = { 
        "id": 5,
        "ideaName": 'some name5',
        "ideaSummary": 'some summary5',
        "authorName": 'some name5',
        "email":'name5@email.com',
        "claimed":false,
        "submitted": true,
     }
      return supertest(app)
        .patch('/v1/todos/aaaaaaaaaaaaaaaaaaaaaaaa')
        .send(idea)
        .expect(404);
    });

  });

  
    

});