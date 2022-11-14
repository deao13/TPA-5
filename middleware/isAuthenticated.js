'use strict'

const jwt = require('jsonwebtoken')
const Model = require('../models/index')
const User = Model.user

module.exports = async (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, async function (err, decode) {
      if (err) req.user = undefined
        if (decode === undefined) {
          req.user = undefined
          res.status(500)
            .send({
              message: 'Token Invalid'
            })
          next()
        } else {
          const user = await User.findOne({
            where: {
              id: decode.id
            }
          })
  
          if (!user) {
            res.status(500)
              .send({
                message: 'User not found'
              })
          } else {
            req.user = user
            next()
          }
        }       
    })
  } else {
    req.user = undefined
    res.status(500)
      .send({
        message: 'Token Invalid'
      })
    next()
  }
}
