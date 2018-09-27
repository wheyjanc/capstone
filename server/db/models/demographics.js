const Sequelize = require('sequelize')
const db = require('../db')

const Demographics = db.define('demographics', {
  name: {
    type: Sequelize.STRING
  }
})

module.exports = Demographics
