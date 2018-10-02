const Sequelize = require('sequelize')
const db = require('../db')

const campaignContract = db.define('campaignContract', {
  userId: {
    type: Sequelize.INTEGER
  }
})

module.exports = campaignContract
