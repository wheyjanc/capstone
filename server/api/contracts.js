const router = require('express').Router()
const { Contract, User, Campaign } = require('../db/models')
const { getUser } = require('./helpers')
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

router.put('/:campaignId', async (req, res, next) => {
  try {
    const contract = await Contract.findAll({
      include: [
        {
          model: Campaign,
          where: { campaignId: req.params.campaignId }
        }
      ]
    })
    contract.clickCount++
  } catch (error) {
    console.error(error)
  }
})

// create a new contract
router.post('/', async (req, res, next) => {
  try {
    const { campaignId, bundleId, contractHash, balance } = req.body
    const newContract = await Contract.create({
      campaignId: campaignId,
      bundleId: bundleId,
      contractHash: contractHash,
      balance: balance
    })

    newContract.addUsers([devId, advertiserId])

    const advertiser = await getUser(advertiserId)
    if (newContract.balance > advertiser.budget) {
      advertiser.update({ isActive: false })
    } else {
      // update budget
      const updatedBudget = advertiser.budget - newContract.balance
      advertiser.update({ budget: updatedBudget })
    }
  } catch (err) {
    next(err)
  }
})
