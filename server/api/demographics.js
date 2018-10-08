const router = require('express').Router()
const { Demographic } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const demographics = await Demographic.findAll()
    res.json(demographics)
  } catch (err) {
    next(err)
  }
})
