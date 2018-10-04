const router = require('express').Router()
var nodemailer = require('nodemailer')
const { Bundle, User, Campaign } = require('../db/models')


router.put('/:bundleId', async (req, res, next) => {
  try {
    const bundleId = req.params.bundleId
    const bundle = await Bundle.findById(bundleId)
    const updateBundle = await bundle.addAdvertisement(req.body.campaignOrAd)
    const updatedBundle = await Bundle.findAll({
      where: {
        id: bundleId
      }
    })
    res.json(updatedBundle)
  } catch (error) {
    console.error(error)
  }
})

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

=======
// to send an email
// router.post('/email', function create(req, res, next) {
//   var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'jstadplacement@gmail.com',
//       pass: 'Hopperjst12345'
//     }
//   })
//   var mailOptions = {
//     from: 'jstadplacement@gmail.com',
//     //this is a variable
//     to: `${advertiserEmail}`,
//     subject: 'Payment required to place your campaign',
//     text: `Please send ${amountDue} to ${contractAddress}`
//   }
//   transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//       console.log(error)
//     } else {
//       console.log('Email sent: ' + info.response)
//     }
//   })
//   res.send(201, req.params)
// })



// get all bundles belonging to a dev user
router.get('/user/:userId', async (req, res, next) => {
  const userId = req.params.userId
  try {
    const bundles = await Bundle.findAll({
      where: {
        developerId: userId
      }
    })
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

// router.post('/send', (req, res, next) => {
//   var name = req.body.name
//   var email = req.body.email
//   var message = req.body.message
//   var content = `name: ${name} \n email: ${email} \n message: ${content} `

//   var mail = {
//     from: name,
//     to: 'RECEIVING_EMAIL_ADDRESS_GOES_HERE', //Change to email address that you want to receive messages on
//     subject: 'New Message from Contact Form',
//     text: content
//   }

//   transporter.sendMail(mail, (err, data) => {
//     if (err) {
//       res.json({
//         msg: 'fail'
//       })
//     } else {
//       res.json({
//         msg: 'success'
//       })
//     }
//   })
// })

module.exports = router
