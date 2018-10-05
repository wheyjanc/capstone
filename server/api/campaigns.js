const router = require('express').Router()
const { Campaign, Advertisement } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const campaigns = await Campaign.findAll({
      include: [{ model: Advertisement }]
    })
    res.json(campaigns)
  } catch (err) {
    next(err)
  }
})
