const router = require('express').Router()

router.use('/bundles', require('./bundles'))
router.use('/contracts', require('./contracts'))
router.use('/campaigns', require('./campaigns'))

module.exports = router
var nodemailer = require('nodemailer')

const creds = require('../../config')
// router.use('/users', require('./users'))
router.use('/dev', require('./webdev'))
router.use('/scripts', require('./scripts'))
router.use('/ads', require('./ads'))

var transport = {
  host: 'smtp.gmail.com',
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error)
  } else {
    console.log('Server is ready to take messages')
  }
})

router.post('/send', (req, res, next) => {
  var name = req.body.name
  var email = req.body.email
  var message = req.body.message
  var content = `name: ${name} \n email: ${email} \n message: ${message} `

  var mail = {
    from: name,
    to: 'e-mail@e-mail.com', //Change to email address that you want to receive messages on
    subject: 'New Message from Contact Form',
    text: content
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
