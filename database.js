const { Sequelize } = require('sequelize')

// Konfigurasi database
const sequelize = new Sequelize('sql12713648', 'sql12713648', 'Xd3tyGDpdt', {
  host: 'sql12.freemysqlhosting.net', // Ganti dengan hostname database
  dialect: 'mysql',
  logging: false // Set to true untuk debug SQL queries
})

module.exports = sequelize
