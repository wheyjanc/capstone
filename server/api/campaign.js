const router = require('express').Router()
const {Bundle, Campaign, Advertisement} = require ('../db/models')

module.exports = router;


router.get('/:bundleId', async (req, res, next) => {
    bundleId = req.params.bundleId
    try {
        let adsArr = []        
        const bundle = await Bundle.findById(bundleId, {
            include: [{model: Campaign, include: [{model: Advertisement}]}]
        })
        await bundle.campaigns.map(campaign => {
            campaign.advertisements.map(ad => {
                adsArr.push(ad)
            })
        })
        res.json(adsArr)
    } catch (err) {
        next(err)
    }
})

router.post('/campaignId', async (req, res, next) => {
    const campaignId = req.params.campaignId
    try{
        const campaign = await Campaign.findById(campaignId)
        let clicks = campaign.clicks +1
        campaign.clicks = clicks
        campaign = await campaign.save()
        res.json(campaign.clicks)
    }catch (err) {
        next(err)
    }
})