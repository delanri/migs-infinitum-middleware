const express = require('express')
const app = express()

const routes = require('./routes')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))


app.get('/', (req, res) => {
  res.json({ name: 'OVO migs API Service', version: '1.0.0' })
})

app.use('/vpcclient', routes.migsclient)

module.exports = app
