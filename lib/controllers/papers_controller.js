// lib/controllers/papers_controller.js
const paper = require('../models/paper')

const index = (request, response) => {
  paper.all()
    .then((papers) => {
      response.status(200).json(papers);
    })
    .catch((error) => {
      response.status(500).json({error});
    })
}

const show = (request, response) => {
  paper.find(request.params.id)
    .then((paper) => {
      response.status(200).json(paper);
    })
    .catch((error) => {
      response.status(500).json({error});
    })
}

const footnotes = (request, response) => {
  paper.findAll(request.params.id)
    .then((paperFootnotes) => {
      response.status(200).json(paperFootnotes)
    })
    .catch((error) => {
      response.status(500).json({error});
    })
}

const create = (request, response) => {
  let newPaper = request.body;
  for (let requiredParameter of ['title', 'author', 'publisher']) {
    if (!newPaper[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { title: <String>, author: <String>, publisher: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }
  paper.create(newPaper)
    .then((paper) => {
      response.status(201).json(`Your paper has been created with the following id ${paper[0]}`);
    })
    .catch((error) => {
      response.status(500).json({error});
    })
}


module.exports = {
  index, show, footnotes, create
}
