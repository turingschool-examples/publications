const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Publications';

app.get('/', (request, response) => {
  response.send('Hello, Publications');
});

// get request to return all papers
app.get('/api/v1/papers', (request, response) => {
  database('papers').select()
    .then((papers) => {
      response.status(200).json(papers);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

// get request to return all footnotes
app.get('/api/v1/footnotes', (request, response) => {
  database('footnotes').select()
    .then((footnotes) => {
      response.status(200).json(footnotes);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

// post request to create a new paper
app.post('/api/v1/papers', (request, response) => {
  const paper = request.body;

  for (let requiredParameter of ['title', 'author', 'publisher']) {
    if (!paper[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { title: <String>, author: <String>, publisher: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('papers').insert(paper, 'id')
    .then(paper => {
      response.status(201).json({ id: paper[0] })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

// post request to create a new footnote for an existing paper
app.post('/api/v1/footnotes', (request, response) => {
  const footnote = request.body;

  for (let requiredParameter of ['note', 'paper_id']) {
    if (!footnote[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { note: <String>, paper_id: <String> You're missing a ${requiredParameter} property.` });
    }
  }

  database('papers').pluck('id')
    .then(paper_ids => {
      if(paper_ids.indexOf(parseInt(footnote.paper_id)) === -1) {
        return response
          .status(422)
          .send({ error: 'The paper id you provided does not exist.' });
      } else {
        database('footnotes').insert(footnote, 'id')
          .then(footnote => {
            response.status(201).json({ id: footnote[0] })
          })
          .catch(error => {
            response.status(500).json({ error });
          });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

// get request for a specific paper
app.get('/api/v1/papers/:id', (request, response) => {
  database('papers').where('id', request.params.id).select()
    .then(papers => {
      if (papers.length) {
        response.status(200).json(papers);
      } else {
        response.status(404).json({
          error: `Could not find paper with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

// get request for all footnotes for a single paper
app.get('/api/v1/papers/:id/footnotes', (request, response) => {
  database('footnotes')
    .where('footnotes.paper_id', request.params.id)
    .select()
    .then(footnotes => {
      if (footnotes.length) {
        response.status(200).json(footnotes);
      } else {
        response.status(404).json({
          error: `Could not find footnotes for paper with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

module.exports = app;
