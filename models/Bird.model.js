const { Schema, model } = require("mongoose");

const birdSchema = new Schema(
  {
    commonName: {
      type: String,
      required: [true, "El nombre común es requerido"],
      unique: true,
      trim: true,
    },
    scientificName: {
      type: String,
      required: [true, "El nombre científico es requerido"],
      unique: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, "La URL de la imagen es requerida"],
    },
    audioUrl: {
      type: String,
      default: null,
    },
    description: {
      female: { type: [String], default: [] },
      male: { type: [String], default:[] },
      general: { type: [String], default: []},
    },
    behavior: { type: [String], default: [] },
    diet: { type: String, default: null },
    distributionMexico: { type: String, default: null },
    curiousFacts: { type: [String], default: [] },
    conservationStatusIUCN: {
      category: {
        type: String,
        enum: ["CR", "EN", "VU", "NT", "LC", "EW", "EX", "DD", "NE"],
        default: null,
      },
      description: {
        type: String,
        enum: [
          "En Peligro Crítico",
          "En Peligro",
          "Vulnerable",
          "Casi Amenazada",
          "Preocupación Menor",
          "Extinta en Estado Silvestre",
          "Extinta",
          "Datos Insuficientes",
          "No Evaluada"
        ],
        default: null,
      }
    },
    conservationStatusNOM059: {
      category: {
        type: String,
        enum: ["P", "A", "Pr", "E"],
        default: null,
      },
      description: {
        type: String,
        enum: [
          "En Peligro de Extinción",
          "Amenazadas",
          "Sujeta a Protección Especial",
          "Probablemente Extinta en el Medio Silvestre"
        ],
        default: null,
      },
    },
  },
  { timestamps: true }
);

module.exports = model("Bird", birdSchema);