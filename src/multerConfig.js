const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Caminho absoluto para o diretório de uploads
const uploadDir = path.resolve(__dirname, './uploads');

// Certifique-se de que o diretório de uploads existe
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, uploadDir);
    },
    filename: (req, file, callback) => {
        const time = Date.now(); // Use Date.now() para obter um timestamp
        callback(null, `${time}_${file.originalname}`);
    }
});

module.exports = storage;
