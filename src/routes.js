const express = require('express');
const multer  = require('multer');
const path  = require('path');
const fs  = require('fs');

const handleFile = require('./convertXlsxToJson');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage });

const Router = express.Router();

Router.post('/excel', upload.single('file'), async (req, res) => {
  try {
    await handleFile(req.file)
    return res.json({ success: true })
  } catch (error) {
    return res.json({ success: false })
  }
})

Router.post('/excel-to-json', async (req, res) => {
  try {
    await handleFile({ path: `${path.resolve()}/file.xlsx` })
    // await fs.writeFileSync('file.json', JSON.stringify(result))
    return res.json({ success: true })
  } catch (error) {
    return res.json({ success: false })
  }
})

Router.get('/json', (req, res) => {
  const rawdata = fs.readFileSync(`${path.resolve()}/file.json`);
  const result = JSON.parse(rawdata)

  return res.json(result)
})

module.exports = Router;
