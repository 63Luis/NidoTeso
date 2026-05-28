// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const path = require('path');

const app = express();

// Servir imágenes de aves desde la carpeta uploads/birds
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// También puedes servir directamente desde /images para URLs más cortas
app.use('/images', express.static(path.join(__dirname, 'uploads/birds')));

// Opcional: Servir la carpeta raíz de uploads
app.use('/static', express.static(path.join(__dirname, 'uploads')));

// ========================================

// Rutas para imágenes
const imageRoutes = require("./routes/image.routes");
app.use("/api/images", imageRoutes);

// También puedes servir imágenes directamente en la raíz
app.use('/img', express.static(path.join(__dirname, 'uploads/birds')));

require("./config")(app);

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const birdRoutes = require("./routes/bird.routes");
app.use("/api", birdRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);



module.exports = app;
