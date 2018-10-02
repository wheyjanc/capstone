const router = require('express').Router()
<<<<<<< HEAD
var nodemailer = require('nodemailer')
const { Bundle, User } = require('../db/models')

// get all bundles belonging to a dev user
router.post('/email', function create(req, res, next) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jstadplacement@gmail.com',
      pass: 'Hopperjst12345'
    }
  })
  var mailOptions = {
    from: 'jstadplacement@gmail.com',
    //this is a variable
    to: `${advertiserEmail}`,
    subject: 'Payment required to place your campaign',
    text: `Please send ${amountDue} to ${contractAddress}`
  }
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log('Email sent: ' + info.response)
    }
  })
  res.send(201, req.params)
})

router.get('/')

module.exports = router
=======
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
>>>>>>> 1cc3ccf7262a9e462027f422c4773e16e2b16220
