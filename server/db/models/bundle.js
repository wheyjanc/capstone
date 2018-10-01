const Sequelize = require('sequelize')
const db = require('../db')

const Bundle = db.define('bundle', {
  projectName: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

module.exports = Bundle
