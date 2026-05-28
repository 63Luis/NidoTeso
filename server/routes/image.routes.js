// server/routes/image.routes.js
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Ruta base para imágenes
const IMAGES_DIR = path.join(__dirname, '../uploads/birds');

// GET /api/images/:filename - Obtener una imagen específica
router.get('/:filename', (req, res) => {
  const filename = req.params.filename;
  
  // Validar que el nombre de archivo no contenga rutas peligrosas
  if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    return res.status(400).json({ message: 'Nombre de archivo inválido' });
  }
  
  const imagePath = path.join(IMAGES_DIR, filename);
  
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).json({ message: 'Imagen no encontrada' });
  }
});

// GET /api/images/check/:filename - Verificar si una imagen existe
router.get('/check/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(IMAGES_DIR, filename);
  
  if (fs.existsSync(imagePath)) {
    res.json({ exists: true, path: `/uploads/birds/${filename}` });
  } else {
    res.json({ exists: false });
  }
});

// GET /api/images/list - Listar todas las imágenes disponibles
router.get('/list', (req, res) => {
  if (!fs.existsSync(IMAGES_DIR)) {
    return res.json({ images: [] });
  }
  
  const files = fs.readdirSync(IMAGES_DIR);
  const images = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
  });
  
  res.json({ 
    count: images.length,
    images: images.map(img => ({
      filename: img,
      url: `/uploads/birds/${img}`,
      path: path.join(IMAGES_DIR, img)
    }))
  });
});

module.exports = router;