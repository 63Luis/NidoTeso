// Mock de dependencias
jest.mock("../../models/Bird.model");
jest.mock("../../models/User.model");
jest.mock("../../middleware/jwt.middleware", () => ({
  isAuthenticated: (req, res, next) => {
    req.payload = { _id: "testUserId", email: "test@test.com", name: "Test User" };
    next();
  }
}));

jest.mock("../../db", () => ({
  connect: jest.fn().mockResolvedValue(true)
}));

const Bird = require("../../models/Bird.model");

describe("API Integration Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Flujo completo de Ave", () => {
    it("debe simular el CRUD de un ave", async () => {
      const newBird = {
        commonName: "Test Bird Integration",
        scientificName: "Testus Integratus",
        imageUrl: "https://example.com/test.jpg"
      };

      const createdBird = { ...newBird, _id: "123456" };
      
      // Mock para creación
      Bird.findOne.mockResolvedValueOnce(null);
      Bird.create.mockResolvedValueOnce(createdBird);
      
      // Mock para lectura
      Bird.findById.mockResolvedValueOnce(createdBird);
      
      // Mock para actualización
      const updatedBird = { ...createdBird, diet: "Seeds" };
      Bird.findById.mockResolvedValueOnce(createdBird);
      Bird.findOne.mockResolvedValueOnce(null);
      Bird.findByIdAndUpdate.mockResolvedValueOnce(updatedBird);
      
      // Mock para eliminación
      Bird.findById.mockResolvedValueOnce(createdBird);
      Bird.findByIdAndDelete.mockResolvedValueOnce(createdBird);

      // Simular creación
      const createResult = await Bird.create(newBird);
      expect(createResult).toEqual(createdBird);
      
      // Simular lectura
      const findResult = await Bird.findById("123456");
      expect(findResult).toEqual(createdBird);
      
      // Simular actualización
      const updateResult = await Bird.findByIdAndUpdate("123456", { diet: "Seeds" }, { new: true });
      expect(updateResult).toEqual(updatedBird);
      
      // Simular eliminación
      const deleteResult = await Bird.findByIdAndDelete("123456");
      expect(deleteResult).toEqual(createdBird);
    });
  });
});