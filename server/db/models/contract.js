const Sequelize = require('sequelize')
const db = require('../db')

const Contract = db.define('contract', {
  contractHash: {
    type: Sequelize.STRING,
    allowNull: false
  },
  balance: {
    type: Sequelize.FLOAT,
    defaultValue: 0.0
  },
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  clickCount: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = Contract
