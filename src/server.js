const express = require('express');
require('dotenv').config()
const app = express();
const { PORT, DB_URL } = require('./config')

const knex = require('knex')

app.get('/api/*', (req, res) => {
  res.json({ok: true});
});

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})

const qry = knexInstance
  .select('id', 'ideaName', 'ideaSummary', 'categemailory')
  .from('id')
  .where({ claimed: TRUE })
  // .first()
  .toQuery()
console.log(qry)


console.log('knex and driver installed correctly')




app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = {app};