const express = require('express')
const https = require('https')
const querystring = require('querystring')
const router = express.Router()
const _ = require('lodash')

router.post('/', (req, res) => {
  const body = req.body
  _.forEach(body, function(value, key){ if(value==='') delete body[key] })
  
  pay(body)
  .then(response => {
    console.log(response)
    res.send(response)
  })
  .catch(error=>{
    res.send(error)
  })

})

const pay = (payload) => {
  const request = https.request
  const options = {
    host : 'migs.mastercard.com.au',
    path : '/vpcdps',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'POST'
  }

  return new Promise((resolve, reject) => {
    const req = request(options, (res) => {
      let data = null;
      res.on('data', (chunk) => {
        data = chunk
        console.log(`BODY: ${chunk}`)
      })
      res.on('end', () => res.statusCode != 200 ? reject(new Error()) : resolve(data))
    })

    req.on('socket', socket => {
      socket.setTimeout(30000)
      socket.on('timeout', () => req.abort())
    })

    req.on('err', (err) => reject(new Error()))
    req.write(querystring.stringify(payload))
    req.end()
  })
}

module.exports = router