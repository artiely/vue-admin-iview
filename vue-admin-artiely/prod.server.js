var express = require('express')
var config = require('./config/index')
var app = express()
app.use(express.static('./dist'))

var port = process.env.PORT || config.build.port
module.exports = app.listen(port, function (err) {
  if (err) {
    console.error(err)
    return
  }
  console.log('Listiening at http://localhost:' + port + '\n')
})
