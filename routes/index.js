const express = require('express')
const router = express.Router()
router.get('/', async (req, res, next) => {
  return res.json('ok')
})

module.exports = router