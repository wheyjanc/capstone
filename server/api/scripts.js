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
    console.log('ads length', ads.length)
    console.log('index', Math.floor(Math.random() * ads.length))
    const currentAd = ads[Math.floor(Math.random() * ads.length)]
    console.log('currentAd', currentAd.image)

    res.send(
      `let targetEl = document.querySelector('#adtarget')
    const adImg = document.createElement('img');
    adImg.setAttribute('src', "${currentAd.image}");
    adImg.addEventListener('click', (evt) => {
      var request = new XMLHttpRequest();
      request.open('PUT', 'http://localhost:8080/api/contracts/1',true )
      request.send()
    window.location.href= "${currentAd.url}"
    });
    targetEl.appendChild(adImg)`
    )
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
