// lib/controllers/footnotes_controller.js
const footnote = require('../models/footnote')

const index = (request, response) => {
  footnote.all()
    .then((footnotes) => {
      response.status(200).json(footnotes);
    })
    .catch((error) => {
      response.status(500).json({error});
    })
}

const create = (request, response) => {
  let newFootnote = request.body;
  for (let requiredParameter of ['note', 'paper_id']) {
    if (!newFootnote[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { note: <String>, paper_id: <String> You're missing a ${requiredParameter} property.` });
    }
  }
  footnote.create(newFootnote)
  .then(footnote => {
    response.status(201).json(`Your footnote has been created with the following id ${footnote[0]}`);
  })
  .catch(error => {
    response.status(500).json({ error });
  });
}

module.exports = {
  index, create,
}
