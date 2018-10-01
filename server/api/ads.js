const router = require('express').Router()
const { Ad, Bundle } = require('../db/models')
module.exports = router

// get all ads
router.get('/', async (req, res, next) => {
  try {
    const ads = await Ad.findAll()
    res.json(ads)
  } catch (err) {
    next(err)
  }
})

// get a specific ad
router.get('/:adId', async (req, res, next) => {
  try {
    const ad = await Ad.findById(req.params.adId)
    if (!ad) res.sendStatus(404)
    else res.send(ad)
  } catch (err) {
    next(err)
  }
})

// get all ads in a bundle???
//get all ads in a campaign -- used for creating script tag
// router.get('/bundle/:bundleId', async (req, res, next) => {
//   const bundleId = req.params.bundleId
//   try {
//     let adsArr = []
//     const bundle = await Bundle.findById(bundleId, {
//       include: [{ model: Campaign, include: [{ model: Advertisement }] }]
//     })
//     await bundle.campaigns.map(campaign => {
//       campaign.advertisements.map(ad => {
//         adsArr.push(ad)
//       })
//     })
//     res.json(adsArr)
//   } catch (err) {
//     next(err)
//   }
// })
