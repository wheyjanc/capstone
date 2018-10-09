const router = require('express').Router()
const { Campaign, Advertisement, Demographic, User } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const campaigns = await Campaign.findAll({
      include: [{all: true}],
    })
    res.json(campaigns)
  } catch (err) {
    next(err)
  }
})

router.get('/campaign/:campaignId', async (req, res, next) => {
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

// get all campaigns belonging to a user
router.get('/:userId', async (req, res, next) => {
  try {
    const campaigns = await Campaign.findAll({
      where: {
        advertiserId: req.params.userId
      },
      include: [{ model: Advertisement }, { model: Demographic }]
    })
    res.json(campaigns)
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res, next) => {
  const { demographics, advertiserId } = req.body
  Campaign.create(req.body)
    .then(campaign => {
      campaign.addDemographics([demographics])
      res.json(campaign)
    })
    .catch(next)
})

router.put('/campaign/:campaignId', (req, res, next) => {
  Campaign.findById(req.params.campaignId, {
    include: [{ model: Advertisement }, { model: Demographic }]
  })
    .then(campaign => {
      if (campaign) {
        campaign.update(req.body).then(updatedCampaign => {
          return res.json(updatedCampaign)
        })
      } else {
        const err = new Error('Campaign not found.')
        err.status = 404
        next(err)
      }
    })
    .catch(next)
})

router.delete('/:campaignId', (req, res, next) => {
  Campaign.findById(req.params.campaignId)
    .then(campaign => {
      if (campaign) {
        campaign
          .destroy({ force: true })
          .then(deletedCampaign => res.json(deletedCampaign))
      } else {
        res.sendStatus(404)
      }
    })
    .catch(next)
})
