const mongoose = require("mongoose");
const Bird = require("../../models/Bird.model");

describe("Bird Model", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Campos requeridos", () => {
    it("debe requerir commonName", () => {
      const bird = new Bird({
        scientificName: "Test Species",
        imageUrl: "https://example.com/test.jpg"
      });
      
      const error = bird.validateSync();
      expect(error.errors.commonName).toBeDefined();
      expect(error.errors.commonName.message).toBe("El nombre común es requerido");
    });

    it("debe requerir scientificName", () => {
      const bird = new Bird({
        commonName: "Test Bird",
        imageUrl: "https://example.com/test.jpg"
      });
      
      const error = bird.validateSync();
      expect(error.errors.scientificName).toBeDefined();
      expect(error.errors.scientificName.message).toBe("El nombre científico es requerido");
    });

    it("debe requerir imageUrl", () => {
      const bird = new Bird({
        commonName: "Test Bird",
        scientificName: "Test Species"
      });
      
      const error = bird.validateSync();
      expect(error.errors.imageUrl).toBeDefined();
      expect(error.errors.imageUrl.message).toBe("La URL de la imagen es requerida");
    });
  });

  describe("Campos opcionales", () => {
    it("debe aceptar audioUrl como opcional", () => {
      const bird = new Bird({
        commonName: "Test Bird",
        scientificName: "Test Species",
        imageUrl: "https://example.com/test.jpg"
      });
      
      expect(bird.audioUrl).toBeNull();
    });

    it("debe tener description con female, male y general como arrays", () => {
      const bird = new Bird({
        commonName: "Test Bird",
        scientificName: "Test Species",
        imageUrl: "https://example.com/test.jpg",
        description: {
          female: ["Descripción hembra 1", "Descripción hembra 2"],
          male: ["Descripción macho 1"],
          general: ["Descripción general 1", "Descripción general 2"]
        }
      });
      
      expect(Array.isArray(bird.description.female)).toBe(true);
      expect(Array.isArray(bird.description.male)).toBe(true);
      expect(Array.isArray(bird.description.general)).toBe(true);
      expect(bird.description.female).toHaveLength(2);
      expect(bird.description.male).toHaveLength(1);
      expect(bird.description.general).toHaveLength(2);
      expect(bird.description.female[0]).toBe("Descripción hembra 1");
      expect(bird.description.male[0]).toBe("Descripción macho 1");
      expect(bird.description.general[0]).toBe("Descripción general 1");
    });

    it("debe tener description con arrays vacíos por defecto", () => {
      const bird = new Bird({
        commonName: "Test Bird",
        scientificName: "Test Species",
        imageUrl: "https://example.com/test.jpg"
      });
      
      expect(bird.description.female).toEqual([]);
      expect(bird.description.male).toEqual([]);
      expect(bird.description.general).toEqual([]);
    });

    it("debe aceptar strings individuales en description (convertidos a array)", () => {
      const bird = new Bird({
        commonName: "Test Bird",
        scientificName: "Test Species",
        imageUrl: "https://example.com/test.jpg",
        description: {
          female: "Descripción hembra",
          male: "Descripción macho",
          general: "Descripción general"
        }
      });
      
      // Mongoose convierte strings a arrays automáticamente
      expect(bird.description.female).toEqual(["Descripción hembra"]);
      expect(bird.description.male).toEqual(["Descripción macho"]);
      expect(bird.description.general).toEqual(["Descripción general"]);
    });

    it("debe tener behavior como array por defecto", () => {
      const bird = new Bird({
        commonName: "Test Bird",
        scientificName: "Test Species",
        imageUrl: "https://example.com/test.jpg"
      });
      
      expect(bird.behavior).toEqual([]);
    });

    it("debe aceptar behavior como array de strings", () => {
      const bird = new Bird({
        commonName: "Test Bird",
        scientificName: "Test Species",
        imageUrl: "https://example.com/test.jpg",
        behavior: ["Comportamiento 1", "Comportamiento 2"]
      });
      
      expect(bird.behavior).toHaveLength(2);
      expect(bird.behavior[0]).toBe("Comportamiento 1");
    });

    it("debe aceptar curiousFacts como array", () => {
      const bird = new Bird({
        commonName: "Test Bird",
        scientificName: "Test Species",
        imageUrl: "https://example.com/test.jpg",
        curiousFacts: ["Dato curioso 1", "Dato curioso 2"]
      });
      
      expect(bird.curiousFacts).toHaveLength(2);
    });
  });

  describe("Conservation Status", () => {
    it("debe aceptar valores válidos para IUCN", () => {
      const bird = new Bird({
        commonName: "Test Bird",
        scientificName: "Test Species",
        imageUrl: "https://example.com/test.jpg",
        conservationStatusIUCN: {
          category: "LC",
          description: "Preocupación Menor"
        }
      });
      
      expect(bird.conservationStatusIUCN.category).toBe("LC");
      expect(bird.conservationStatusIUCN.description).toBe("Preocupación Menor");
    });

    it("debe aceptar valores válidos para NOM059", () => {
      const bird = new Bird({
        commonName: "Test Bird",
        scientificName: "Test Species",
        imageUrl: "https://example.com/test.jpg",
        conservationStatusNOM059: {
          category: "A",
          description: "Amenazadas",
          status: "En riesgo"
        }
      });
      
      expect(bird.conservationStatusNOM059.category).toBe("A");
      expect(bird.conservationStatusNOM059.description).toBe("Amenazadas");
    });
  });

  describe("Unicidad", () => {
    it("debe tener commonName como único", () => {
      const birdSchema = Bird.schema;
      const commonNamePath = birdSchema.path("commonName");
      
      expect(commonNamePath.options.unique).toBe(true);
    });

    it("debe tener scientificName como único", () => {
      const birdSchema = Bird.schema;
      const scientificNamePath = birdSchema.path("scientificName");
      
      expect(scientificNamePath.options.unique).toBe(true);
    });
  });
});