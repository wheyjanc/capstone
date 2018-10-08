const Sequelize = require('sequelize')
const db = require('../db')

const PartiesToContract = db.define('partiesToContract', {
  contractId: {
    type: Sequelize.FLOAT
  },
  userId: {
    type: Sequelize.FLOAT
  }
})
module.exports = PartiesToContract
