const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Make sure this directory exists
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

app.use(express.static('.')); // Serve static files from current directory

app.post('/upload', upload.single('image'), (req, res) => {
    console.log('File received:', req.file);
    res.json({ success: true, message: 'Successfully uploaded ' + req.file.originalname });
});

app.get('/success', (req, res) => {
    res.send('<p>Submission successful!</p>'); // You can customize this page
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
