const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { v1: uuidv1 } = require('uuid');
const vision = require('@google-cloud/vision');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Google Cloud Vision client
const client = new vision.ImageAnnotatorClient();

// Pretty console log helpers
const log = {
  info: (msg) => console.log(`\x1b[36m[INFO]\x1b[0m ${msg}`),
  success: (msg) => console.log(`\x1b[32m[SUCCESS]\x1b[0m ${msg}`),
  warn: (msg) => console.log(`\x1b[33m[WARN]\x1b[0m ${msg}`),
  error: (msg) => console.log(`\x1b[31m[ERROR]\x1b[0m ${msg}`),
  banner: () => {
    console.log('\x1b[35m========================================\x1b[0m');
    console.log('\x1b[35m   PhoneCameraRecognitionApp Cloud API   \x1b[0m');
    console.log('\x1b[35m========================================\x1b[0m');
  }
};

log.banner();
log.info('Google Vision API cloud detection server starting...');

app.post('/detect', upload.single('image'), async (req, res) => {
  if (!req.file) {
    log.warn('Received detection request with no image.');
    return res.status(400).json({ error: 'No image uploaded' });
  }
  try {
    log.info(`Received image for cloud detection: ${req.file.originalname || req.file.filename}`);
    // Call Google Vision API
    const [result] = await client.objectLocalization(req.file.path);
    const objects = result.localizedObjectAnnotations || [];
    const labels = objects.map(obj => obj.name);
    log.success(`Cloud detection complete. Labels: ${labels.length ? labels.join(', ') : 'None'}`);
    fs.unlinkSync(req.file.path);
    res.json({ labels });
  } catch (err) {
    log.error(`Cloud detection error: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  log.success(`Cloud server running and listening on http://localhost:${PORT}`);
  log.info('POST /detect to analyze an image for objects/animals using Google Vision.');
});
