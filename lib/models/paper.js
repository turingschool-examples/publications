// lib/models/paper.js
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const all = () => database('papers')
  .select()

const find = (id) => database('papers')
  .where('id', id)
  .select()

const findAll = (id) => database('papers')
  .join('footnotes', {'papers.id': 'footnotes.paper_id'})
  .where('footnotes.paper_id', id)
  .select()

const create = (newPaper) => database('papers')
  .insert(newPaper, 'id')

module.exports = {
  all, find, findAll, create,
}
