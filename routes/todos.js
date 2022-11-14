const express = require('express')
const router = express.Router()
const Model = require('../models/index')
const User = Model.user
const Todo = Model.todo

const isAuthenticated = require('../middleware/isAuthenticated')

router.get('/', isAuthenticated, async (req, res) => {
  const todos = await Todo.findAll({
    where: {
      user_id: req.user.id
    }
  })

  if (!todos) {
    return res.status(404).send({
      data: [],
      message: 'Failed Showing Data.'
    })
  }

  return res.status(200).send({
    data: todos,
    message: 'Success Showing Data.'
  })
})

router.get('/:id', isAuthenticated, async (req, res) => {
  const todo = await Todo.findOne({
    where: {
      user_id: req.user.id,
      id: req.params.id
    }
  })

  if (!todo) {
    return res.status(404).send({
      data: null,
      message: 'Failed Showing Data.'
    })
  }

  return res.status(200).send({
    data: todo,
    message: 'Success Showing Data.'
  })
})

router.post('/', isAuthenticated, async (req, res) => {
  const newTodo = await Todo.create({
    title: req.body.title,
    user_id: req.user.id
  })

  if (!newTodo) {
    return res.status(400).send({
      data: null,
      message: 'Failed Creating Data.'
    })
  }

  return res.status(201).send({
    data: newTodo,
    message: 'Success Creating Data.'
  })
})

router.patch('/:id', isAuthenticated, async (req, res) => {
  const updateTodo = await Todo.update({
    title: req.body.title
  }, {
    where: {
      user_id: req.user.id,
      id: req.params.id
    }
  })

  if (!updateTodo) {
    return res.status(400).send({
      message: 'Failed Updating Data.'
    })
  }

  return res.status(200).send({
    message: 'Success Updating Data.'
  })
})

router.delete('/', isAuthenticated, async (req, res) => {
  const deleteTodo = await Todo.destroy({
    where: {
      user_id: req.user.id
    }
  })

  if (!deleteTodo) {
    return res.status(400).send({
      message: 'Failed Deleting All Data.'
    })
  }

  return res.status(204).send({
    message: 'Success Deleting All Data.'
  })
})

router.delete('/:id', isAuthenticated, async (req, res) => {
  const deleteTodo = await Todo.destroy({
    where: {
      user_id: req.user.id,
      id: req.params.id
    }
  })

  if (!deleteTodo) {
    return res.status(400).send({
      message: 'Failed Deleting Data.'
    })
  }

  return res.status(204).send({
    message: 'Success Deleting Data.'
  })
})

module.exports = router