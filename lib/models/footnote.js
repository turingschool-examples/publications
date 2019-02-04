// lib/models/paper.js
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

const all = () => database('footnotes')
  .select()

const create = (newFootnote) => database('footnotes')
  .insert(newFootnote, 'id')

module.exports = {
  all, create,
}
