const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Model = require('../models/index')
const User = Model.user
const jwt = require('jsonwebtoken')
const isAuthenticated = require('../middleware/isAuthenticated')

router.get('/info', isAuthenticated, async (req, res) => {
  return res.status(200).send({
    user: req.user
  })
})

router.post('/login', async (req, res) => {
  const user = await User.findOne({
    where: {
      email: req.body.email
    }
  })

  if (!user) {
    return res.status(404)
      .send({
        message: "User Not found."
      })
  }

  const passwordIsValid = bcrypt.compareSync(
    req.body.password,
    user.password
  )

  if (!passwordIsValid) {
    return res.status(401)
      .send({
        accessToken: null,
        message: "Invalid Password!"
      })
  }

  const token = jwt.sign({
    id: user.id
  }, process.env.API_SECRET, {
    expiresIn: 86400
  })

  return res.status(200)
    .send({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      message: "Login successfull",
      accessToken: token,
    })
})

router.post('/register', async (req, res) => {
  const existedUser = await User.findOne({
    where: {
      email: req.body.email
    }
  })

  if (existedUser) {
    return res.status(404)
      .send({
        message: "User Aleady Exist."
      })
  }

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  })

  const token = jwt.sign({
    id: user.id
  }, process.env.API_SECRET, {
    expiresIn: 86400
  })

  return res.status(201)
    .send({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      message: "Registration Success.",
      accessToken: token,
    })
})

module.exports = router