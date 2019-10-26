const app = require('./app')
const knex = require('knex')
const { PORT, DB_URL } = require('./config')

app.use((req, res) => {
  res.send('Hello, world!')
})

const db = knex({
  client: 'pg',
  connection: DB_URL,
})

app.set('db', db)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = {app};