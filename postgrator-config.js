require('dotenv').config();

module.exports = {
  "migrationsDirectory": "migrations",
  "driver": "pg",
  "connectionString": (process.env.NODE_ENV === 'test')
  ? process.env.TEST_POSTGRES_URL
  : process.env.POSTGRES_URL,
  "ssl": !!process.env.SSL,
}