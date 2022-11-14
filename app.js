require('dotenv').config()

const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

const app = express()

const corsOptions = {
  methods: ['PUT, GET, POST, DELETE, PATCH'],
  allowedHeaders: ['Origin, Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials, Accept-Language'],
  credentials: true,
  preflightContinue: false
}

app.use(cors(corsOptions))

app.use(helmet())
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json({
  extend: false,
  limit: '100mb'
}))

app.use(bodyParser.urlencoded({
  limit: '100mb',
  extended: true
}))

// Routing
const route = {
  index: require('./routes/index'),
  auth: require('./routes/auth'),
  todos: require('./routes/todos')
}

app.use('/', route.index)
app.use('/auth', route.auth)
app.use('/todos', route.todos)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
