const express = require('express')
const https = require('https')
const querystring = require('querystring')
const router = express.Router()
const _ = require('lodash')

router.post('/', (req, res) => {
  const body = req.body
  let  url = 'https://migs.mastercard.com.au/vpcpay';
  let form = `<form name="form" action="${url}" method="POST">`

  _.forEach(body, function(value, key){
    if(value === '') 
      delete body[key]
    else
    {
      form += `<input type="hidden" value="${value}" name="${key}"/>`
    }
  })
  form += '</form>'
  form += '<script>document.form.submit()</script>'
  res.send(form)

})

module.exports = router