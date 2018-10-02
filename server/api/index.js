const router = require('express').Router()
module.exports = router

// router.use('/users', require('./users'))
// router.use('/dev', require('./webdev'))
// router.use('/ads', require('./ads'))
router.use('/bundles', require('./bundles'))
<<<<<<< HEAD
// router.use('./contracts', require('./contracts'))
// router.use('./campaigns', require('./campaigns'))
=======
router.use('/contracts', require('./contracts'))
router.use('/campaigns', require('./campaigns'))

>>>>>>> 1cc3ccf7262a9e462027f422c4773e16e2b16220
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
