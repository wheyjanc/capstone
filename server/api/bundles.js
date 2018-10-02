const router = require('express').Router()
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
