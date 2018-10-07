const router = require('express').Router()
const { Campaign, Advertisement, Demographic } = require('../db/models')
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

router.get('/:campaignId', async (req, res, next) => {
  try {
    const campaign = await Campaign.findById(req.params.campaignId, {
      include: [{ model: Advertisement }, { model: Demographic }]
    })
    if (!campaign) res.sendStatus(404)
    else res.send(campaign)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { demographics, name, price, advertiserId } = req.body
    console.log(req.body)
    const newCampaign = await Campaign.create(req.body)

    // newCampaign.addDemographics([demographics])
    // newCampaign.addUser(advertiserId)

    res.json(newCampaign)
  } catch (err) {
    next(err)
  }
})

router.PushSubscription('/:campaignId', async (req, res, next) => {})
