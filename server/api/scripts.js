const router = require('express').Router()

const { Bundle, Campaign, Advertisement } = require('../db/models')

router.get('/:bundleId.js', async (req, res, next) => {
  const bundleId = req.params.bundleId
  try {
    let ads = []
    const bundle = await Bundle.findById(bundleId, {
      include: [{ model: Campaign, include: [{ model: Advertisement }] }]
    })
    await bundle.campaigns.map(campaign => {
      campaign.advertisements.map(ad => {
        ads.push(ad)
      })
    })
    const currentAd = ads[Math.floor(Math.random() * (ads.length + 1))]
    res.send(`
let targetEl = document.querySelector('.ad-target');
const adImg = document.createElement('img');
adImg.setAttribute('src', ${currentAd.dataValues.image});
adImg.addEventListener('click', (evt) => {
    var request = new XMLHttpRequest();
    request.open('PUT, 'http://localhost:8080/api/contracts/:campaignId',true )
    request.send()
window.location.href= ${currentAd.dataValues.url}
  // SHOW AD IN *NEW WINDOW* OR VIA REDIRECT (window.location.href = "AD TARGET URL")
  // XHR TO ENDPOINT (perhaps localhost:3000/api/contractsomething/:bundleId) - campaign id. clicks
});
targetEl.appendChild(adImg)
`)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
