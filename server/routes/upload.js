// server/routes/upload.js
const express = require('express');
const router = express.Router();
const upload = require('../config/s3');
const File = require('../models/File');
const auth = require('../middleware/auth');

router.post('/', auth, upload.single('file'), async (req, res) => {
  try {
    const file = new File({
      userId: req.user.id,
      fileUrl: req.file.location,
      fileName: req.file.originalname,
      fileType: req.file.mimetype
    });
    await file.save();
    res.json({ fileUrl: req.file.location });
  } catch (error) {
    res.status(500).json({ error: 'Error al subir archivo' });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const files = await File.find({ userId: req.user.id });
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener archivos' });
  }
});

// Endpoint para obtener todos los archivos
router.get('/all', async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener archivos' });
  }
});

module.exports = router;