const router = require('express').Router()
const { Campaign } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const campaigns = await Campaign.findAll()
    res.json(campaigns)
  } catch (err) {
    next(err)
  }
})
