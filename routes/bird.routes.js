const express = require("express");
const router = express.Router();
const Bird = require("../models/Bird.model");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// POST /api/birds - Create a new bird
router.post("/birds", isAuthenticated, async (req, res, next) => {
  try {
    const {
      commonName,
      scientificName,
      imageUrl,
      audioUrl,
      description,
      behavior,
      diet,
      distributionMexico,
      curiousFacts,
      conservationStatusIUCN,
      conservationStatusNOM059,
    } = req.body;

    // Check if required fields are provided
    if (!commonName || !scientificName || !imageUrl) {
      return res.status(400).json({ 
        message: "commonName, scientificName and imageUrl are required" 
      });
    }

    // Check if bird with same commonName or scientificName already exists
    const existingBird = await Bird.findOne({
      $or: [{ commonName }, { scientificName }]
    });

    if (existingBird) {
      return res.status(400).json({ 
        message: "A bird with this common name or scientific name already exists" 
      });
    }

    // Create new bird
    const newBird = await Bird.create({
      commonName,
      scientificName,
      imageUrl,
      audioUrl,
      description,
      behavior,
      diet,
      distributionMexico,
      curiousFacts,
      conservationStatusIUCN,
      conservationStatusNOM059,
    });

    res.status(201).json(newBird);
  } catch (error) {
    next(error);
  }
});

// GET /api/birds - Get all birds
router.get("/birds", async (req, res, next) => {
  try {
    const birds = await Bird.find().sort({ commonName: 1 });
    res.status(200).json(birds);
  } catch (error) {
    next(error);
  }
});

// GET /api/birds/:id - Get a single bird by ID
router.get("/birds/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const bird = await Bird.findById(id);

    if (!bird) {
      return res.status(404).json({ message: "Bird not found" });
    }

    res.status(200).json(bird);
  } catch (error) {
    next(error);
  }
});

// PUT /api/birds/:id - Update a bird by ID
router.put("/birds/:id", isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      commonName,
      scientificName,
      imageUrl,
      audioUrl,
      description,
      behavior,
      diet,
      distributionMexico,
      curiousFacts,
      conservationStatusIUCN,
      conservationStatusNOM059,
    } = req.body;

    // Check if bird exists
    const bird = await Bird.findById(id);
    if (!bird) {
      return res.status(404).json({ message: "Bird not found" });
    }

    // Check for duplicate commonName or scientificName (excluding current bird)
    if (commonName || scientificName) {
      const duplicateCheck = await Bird.findOne({
        $or: [
          { commonName: commonName || bird.commonName },
          { scientificName: scientificName || bird.scientificName }
        ],
        _id: { $ne: id }
      });

      if (duplicateCheck) {
        return res.status(400).json({ 
          message: "A bird with this common name or scientific name already exists" 
        });
      }
    }

    // Update bird
    const updatedBird = await Bird.findByIdAndUpdate(
      id,
      {
        commonName: commonName || bird.commonName,
        scientificName: scientificName || bird.scientificName,
        imageUrl: imageUrl || bird.imageUrl,
        audioUrl: audioUrl !== undefined ? audioUrl : bird.audioUrl,
        description: description || bird.description,
        behavior: behavior || bird.behavior,
        diet: diet || bird.diet,
        distributionMexico: distributionMexico || bird.distributionMexico,
        curiousFacts: curiousFacts || bird.curiousFacts,
        conservationStatusIUCN: conservationStatusIUCN || bird.conservationStatusIUCN,
        conservationStatusNOM059: conservationStatusNOM059 || bird.conservationStatusNOM059,
      },
      { new: true }
    );

    res.status(200).json(updatedBird);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/birds/:id - Delete a bird by ID
router.delete("/birds/:id", isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const bird = await Bird.findById(id);

    if (!bird) {
      return res.status(404).json({ message: "Bird not found" });
    }

    await Bird.findByIdAndDelete(id);
    res.status(200).json({ message: "Bird deleted successfully" });
  } catch (error) {
    next(error);
  }
});

// GET /api/birds/search/:term - Search birds by commonName or scientificName
router.get("/birds/search/:term", async (req, res, next) => {
  try {
    const { term } = req.params;
    const birds = await Bird.find({
      $or: [
        { commonName: { $regex: term, $options: "i" } },
        { scientificName: { $regex: term, $options: "i" } }
      ]
    }).sort({ commonName: 1 });

    res.status(200).json(birds);
  } catch (error) {
    next(error);
  }
});

module.exports = router;