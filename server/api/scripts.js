const router = require('express').Router()

const { Bundle, Campaign, Advertisement, Contract } = require('../db/models')

router.get('/:bundleId.js', async (req, res, next) => {
  try {
    let ads = []
    const bundle = await Bundle.findById(req.params.bundleId, {
      include: [
        {
          model: Campaign,
          include: [{ model: Advertisement, include: [{ model: Contract }] }]
        }
      ]
    })
    await bundle.campaigns.map(campaign => {
      campaign.advertisements.map(ad => {
        ads.push(ad)
      })
    })
    // console.log('ads', ads)
    const currentAd = ads[Math.floor(Math.random() * ads.length)]

    const contractHash = currentAd.contracts[0].contractHash

    res.send(
      `let targetEl = document.querySelector('#adtarget')
    const adImg = document.createElement('img');
    adImg.setAttribute('src', "${currentAd.image}");
    adImg.addEventListener('click', (evt) => {
      var request = new XMLHttpRequest();
      request.open('POST', 'http://localhost:8080/api/contracts/${contractHash}', true )

      request.send()
    window.location.href= "${currentAd.url}"
    });
    targetEl.appendChild(adImg)`
    )
  } catch (error) {
    console.error(error)
  }
})

router.get('/:contractHash.js', async (req, res, next) => {
  //   const bundleId = req.params.bundleId
  //   try {
  //

  //     console.log('ads length', ads.length)
  //     console.log('index', Math.floor(Math.random() * ads.length))
  //     const currentAd = ads[Math.floor(Math.random() * ads.length)]
  //     console.log('currentAd', currentAd.image)
  const contractHash = req.params.contractHash
  try {
    // await contract.campaigns.map(campaign => {
    //   campaign.advertisements.map(ad => {
    //     ads.push(ad)
    //   })
    // })
    let ads = contract.campaign.advertisements
    console.log('campaign', contract.campaign.advertisements)
    console.log('currentAd', currentAd)
  } catch (error) {
    console.error(error)
  }
})

module.exports = router
