const router = require('express').Router()
const { Bundle, User, Campaign } = require('../db/models')
module.exports = router

// get all bundles belonging to a dev user
router.get('/', async (req, res, next) => {
  try {
    const bundles = await Bundle.findAll()
    res.json(bundles)
  } catch (err) {
    next(err)
  }
})

// get all campaigns in a specific bundle and their advertiser email
router.get('/:bundleId', async (req, res, next) => {
  try {
    const bundle = await Bundle.findById(req.params.bundleId, {
      include: [
        { model: User, as: 'developer' },
        {
          model: Campaign,
          as: 'campaigns',
          include: [{ model: User, as: 'advertiser' }]
        }
      ]
    })
    if (!bundle) res.sendStatus(404)
    else res.json(bundle)
  } catch (err) {
    next(err)
  }
})
