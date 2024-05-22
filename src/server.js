const express = require('express')
const routes = require('./routes')



const app = express()
routes(app)

app.listen(3000, () => {
    console.log("servidor no ar")
})

module.exports = app
