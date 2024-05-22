const bodyParser = require('body-parser')
const app = require('../server')
const uploadRoute = require('./uploadRoute')

module.exports = app => {
    app.use(
      bodyParser.json(),
      uploadRoute
   
      )
}