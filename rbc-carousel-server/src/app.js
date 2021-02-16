require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('config')
const connectDB = require('../config/db')

const app = express()

//Connect Database
connectDB();

//Init Middleware

app.use(express.json({ extended: false }));

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(cors())
app.use(helmet())

app.get('/',(req,res) => {
    res.send('API running!')
})

app.use('/api/images', require('../routes/api/images'));

module.exports = app