const router = require('express').Router()
const { Contract, User } = require('../db/models')
module.exports = router

// get all contracts
router.get('/', async (req, res, next) => {
  try {
    const contracts = await Contract.findAll({
      include: [{ model: User, through: 'partiesToContract' }]
    })
    res.json(contracts)
  } catch (err) {
    next(err)
  }
})

// get contract by id
router.get('/:contractId', async (req, res, next) => {
  try {
    const contract = await Contract.findById(req.params.contractId)
    if (!contract) res.sendStatus(404)
    else res.send(contract)
  } catch (err) {
    next(err)
  }
})

// create a new contract
router.post('/', async (req, res, next) => {
    try {
        const advertiser = await Contract.find({
            where: { contractHash: req.body.contractHash },
            include: [{ model: User, through: 'partiesToContract' }, { model: Campaign, through: ''}]
        })
        const contract = await Contract.create(req.body)
        if (contract.balance > advertiser.budget) {
            advertiser.update({ isActive: false })
        }
        else {
            const updatedBudget = advertiser.budget - contract.balance
            advertiser.update({ budget: updatedBudget })
        }
    }
})
