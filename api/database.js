const { Sequelize } = require('sequelize')

// Konfigurasi database
const sequelize = new Sequelize('sql12713648', 'sql12713648', 'Xd3tyGDpdt', {
  host: 'sql12.freemysqlhosting.net', // Ganti dengan hostname database
  dialect: 'mysql',
  logging: false // Set to true untuk debug SQL queries
})

sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((err) => console.error('Unable to connect to the database:', err))

module.exports = sequelize
