const router = require('express').Router()
router.use('/bundles', require('./bundles'))
router.use('/contracts', require('./contracts'))
router.use('/campaigns', require('./campaigns'))
router.use('/dev', require('./webdev'))
router.use('/scripts', require('./scripts'))
router.use('/ads', require('./ads'))
router.use('/users/', require('./users'))
router.use('/demographics', require('./demographics'))

var nodemailer = require('nodemailer')

const creds = require('../../config')
module.exports = router
router.use('/auth', require('../auth'))

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
  var mail = req.body.mail

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      console.error(err)
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
