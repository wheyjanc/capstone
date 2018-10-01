const router = require('express').Router()
const { Bundle, User } = require('../db/models')

// get all bundles belonging to a dev user
router.get('/')
