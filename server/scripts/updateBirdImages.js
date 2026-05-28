const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

// Directorio de imágenes
const IMAGES_DIR = path.join(__dirname, '../uploads/birds');

// Modelo de Bird
const Bird = require('../models/Bird.model');

// Configuración del servidor
const BASE_URL = process.env.BASE_URL || 'http://localhost:5005';

// Función para normalizar nombres (eliminar acentos, espacios, mayúsculas)
function normalizeName(name) {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Función para comparar si dos nombres coinciden
function namesMatch(birdName, imageName) {
  const normalizedBird = normalizeName(birdName);
  const normalizedImage = normalizeName(imageName.replace(/\.(png|jpg|jpeg|gif|webp)$/i, ''));
  
  if (normalizedBird === normalizedImage) return true;
  if (normalizedBird.includes(normalizedImage) || normalizedImage.includes(normalizedBird)) {
    return true;
  }
  return false;
}

// ✅ NUEVA FUNCIÓN: SIN codificación, mantiene espacios y acentos originales
function generateImageUrl(filename) {
  // No usar encodeURIComponent, mantener el nombre original
  return `${BASE_URL}/uploads/birds/${filename}`;
}

async function updateBirdImages() {
  try {
    console.log('🚀 Actualizando imágenes de aves...\n');
    
    if (!fs.existsSync(IMAGES_DIR)) {
      console.error(`❌ Carpeta de imágenes no encontrada: ${IMAGES_DIR}`);
      process.exit(1);
    }
    
    const imageFiles = fs.readdirSync(IMAGES_DIR).filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.png', '.jpg', '.jpeg', '.gif', '.webp'].includes(ext);
    });
    
    console.log(`📸 Imágenes encontradas: ${imageFiles.length}\n`);
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Conectado a MongoDB\n');
    
    const birds = await Bird.find();
    console.log(`📖 Aves en base de datos: ${birds.length}\n`);
    
    let updatedCount = 0;
    let matchedCount = 0;
    const unmatchedImages = [];
    
    for (const imageFile of imageFiles) {
      const imageBaseName = imageFile.replace(/\.(png|jpg|jpeg|gif|webp)$/i, '');
      const matchedBird = birds.find(bird => namesMatch(bird.commonName, imageBaseName));
      
      if (matchedBird) {
        // ✅ Usar la nueva función que NO codifica
        const newImageUrl = generateImageUrl(imageFile);
        
        if (matchedBird.imageUrl !== newImageUrl) {
          matchedBird.imageUrl = newImageUrl;
          await matchedBird.save();
          console.log(`  ✅ ${matchedBird.commonName} ← ${imageFile}`);
          updatedCount++;
        } else {
          console.log(`  ⏭️  ${matchedBird.commonName} ← ${imageFile} (ya actualizada)`);
        }
        matchedCount++;
      } else {
        console.log(`  ❌ Sin coincidencia: ${imageFile}`);
        unmatchedImages.push(imageFile);
      }
    }
    
    console.log('\n📊 RESUMEN:');
    console.log(`   ✅ Aves actualizadas: ${updatedCount}`);
    console.log(`   🔗 Coincidencias encontradas: ${matchedCount}`);
    console.log(`   ❌ Imágenes sin coincidencia: ${unmatchedImages.length}`);
    
    const updatedBirds = await Bird.find({ imageUrl: { $regex: '/uploads/birds/' } }).limit(3);
    if (updatedBirds.length > 0) {
      console.log('\n🔗 EJEMPLOS DE URLs GENERADAS (AHORA SIN CODIFICAR):');
      updatedBirds.forEach(bird => {
        console.log(`   ${bird.commonName}: ${bird.imageUrl}`);
      });
    }
    
    console.log('\n🎉 Proceso completado!');
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

updateBirdImages();