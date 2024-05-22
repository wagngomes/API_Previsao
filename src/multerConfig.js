const multer = require('multer')
const path = require('path')
const fs = require('fs')


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.resolve("uploads"))
    },
    filename: (req, file, callback) => {

        const time = new Date().getDate()

        callback(null, `${time}_${file.originalname}`)

    }
})

module.exports = storage