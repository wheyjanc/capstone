const router = require('express').Router()
const { User } = require('../db/models')

module.exports = router

router.get('/payment/:blockHash', async (req, res, next) => {
  try {
    console.log('hello! we are in payment')
    const allContracts = await factory.methods.getDeployedBlocks().call()
    console.log('allContracts', allContracts)
  } catch (error) {
    console.error(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'isAdvertiser']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await User.destroy({ where: { id: req.params.id } })
    res.json(req.params.id)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { budget } = req.body

    console.log(req.body)
    let updateUser = await User.findById(req.params.id)
    console.log('balance', updateUser.balance)
    if (budget > updateUser.budget) {
      console.log('budget', budget)
      const diff = updateUser.budget - updateUser.balance
      console.log('diff', diff)
      const newBalance = budget - diff
      console.log('newBalance', newBalance)
      await updateUser.update({ balance: newBalance })
    }

    await updateUser.update(req.body)

    res.json(updateUser)
  } catch (err) {
    next(err)
  }
})
