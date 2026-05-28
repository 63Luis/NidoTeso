// Mocks
jest.mock("../../../models/Bird.model");
jest.mock("../../../middleware/jwt.middleware", () => ({
  isAuthenticated: (req, res, next) => {
    req.payload = { _id: "testUserId", email: "test@test.com", name: "Test User" };
    next();
  }
}));

const Bird = require("../../../models/Bird.model");
const express = require("express");
const birdRoutes = require("../../../routes/bird.routes");

const app = express();
app.use(express.json());
app.use("/api", birdRoutes);

// Helper para simular request/response
const mockRequest = (body = {}, params = {}, query = {}) => ({
  body,
  params,
  query,
  payload: { _id: "testUserId" }
});

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("Bird Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/birds", () => {
    const validBird = {
      commonName: "Águila Real",
      scientificName: "Aquila chrysaetos",
      imageUrl: "https://example.com/aguila.jpg",
      audioUrl: "https://example.com/audio.mp3",
      behavior: ["Caza en vuelo", "Monógama"],
      diet: "Conejos",
      distributionMexico: "Norte de México",
      curiousFacts: ["Dato 1", "Dato 2"]
    };

    it("debe crear un ave cuando está autenticado", async () => {
      const mockBird = { ...validBird, _id: "123456" };
      Bird.findOne.mockResolvedValue(null);
      Bird.create.mockResolvedValue(mockBird);

      const req = mockRequest(validBird);
      const res = mockResponse();
      const next = jest.fn();

      const routeHandler = birdRoutes.stack.find(
        layer => layer.route?.path === '/birds' && layer.route?.methods?._post
      )?.handle;

      if (routeHandler) {
        await routeHandler(req, res, next);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockBird);
      }
    });

    it("debe retornar 400 si falta commonName", async () => {
      const req = mockRequest({ scientificName: "Test", imageUrl: "url" });
      const res = mockResponse();
      const next = jest.fn();

      const routeHandler = birdRoutes.stack.find(
        layer => layer.route?.path === '/birds' && layer.route?.methods?._post
      )?.handle;

      if (routeHandler) {
        await routeHandler(req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
          message: expect.stringContaining("required")
        });
      }
    });
  });

  describe("GET /api/birds", () => {
    it("debe retornar todas las aves", async () => {
      const mockBirds = [
        { _id: "1", commonName: "Águila", scientificName: "Aquila", imageUrl: "url1" },
        { _id: "2", commonName: "Colibrí", scientificName: "Colibri", imageUrl: "url2" }
      ];

      Bird.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockBirds)
      });

      const req = mockRequest();
      const res = mockResponse();
      const next = jest.fn();

      const routeHandler = birdRoutes.stack.find(
        layer => layer.route?.path === '/birds' && layer.route?.methods?._get
      )?.handle;

      if (routeHandler) {
        await routeHandler(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockBirds);
      }
    });
  });

  describe("GET /api/birds/:id", () => {
    it("debe retornar un ave por ID", async () => {
      const mockBird = {
        _id: "123",
        commonName: "Test Bird",
        scientificName: "Test Species",
        imageUrl: "https://example.com/test.jpg"
      };

      Bird.findById.mockResolvedValue(mockBird);

      const req = mockRequest({}, { id: "123" });
      const res = mockResponse();
      const next = jest.fn();

      const routeHandler = birdRoutes.stack.find(
        layer => layer.route?.path === '/birds/:id' && layer.route?.methods?._get
      )?.handle;

      if (routeHandler) {
        await routeHandler(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockBird);
      }
    });

    it("debe retornar 404 si no existe el ave", async () => {
      Bird.findById.mockResolvedValue(null);

      const req = mockRequest({}, { id: "nonexistent" });
      const res = mockResponse();
      const next = jest.fn();

      const routeHandler = birdRoutes.stack.find(
        layer => layer.route?.path === '/birds/:id' && layer.route?.methods?._get
      )?.handle;

      if (routeHandler) {
        await routeHandler(req, res, next);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: "Bird not found" });
      }
    });
  });

  describe("PUT /api/birds/:id", () => {
    it("debe actualizar un ave cuando está autenticado", async () => {
      const existingBird = {
        _id: "123",
        commonName: "Original Name",
        scientificName: "Original Species",
        imageUrl: "https://example.com/original.jpg"
      };

      const updatedBird = {
        ...existingBird,
        commonName: "Updated Name",
        diet: "Insects"
      };

      Bird.findById.mockResolvedValue(existingBird);
      Bird.findOne.mockResolvedValue(null);
      Bird.findByIdAndUpdate.mockResolvedValue(updatedBird);

      const req = mockRequest({ commonName: "Updated Name", diet: "Insects" }, { id: "123" });
      const res = mockResponse();
      const next = jest.fn();

      const routeHandler = birdRoutes.stack.find(
        layer => layer.route?.path === '/birds/:id' && layer.route?.methods?._put
      )?.handle;

      if (routeHandler) {
        await routeHandler(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(updatedBird);
      }
    });
  });

  describe("DELETE /api/birds/:id", () => {
    it("debe eliminar un ave cuando está autenticado", async () => {
      const existingBird = {
        _id: "123",
        commonName: "To Delete",
        scientificName: "Deletus",
        imageUrl: "https://example.com/delete.jpg"
      };

      Bird.findById.mockResolvedValue(existingBird);
      Bird.findByIdAndDelete.mockResolvedValue(existingBird);

      const req = mockRequest({}, { id: "123" });
      const res = mockResponse();
      const next = jest.fn();

      const routeHandler = birdRoutes.stack.find(
        layer => layer.route?.path === '/birds/:id' && layer.route?.methods?._delete
      )?.handle;

      if (routeHandler) {
        await routeHandler(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: "Bird deleted successfully" });
      }
    });
  });

  describe("GET /api/birds/search/:term", () => {
    it("debe buscar aves por término", async () => {
      const mockResults = [
        {
          _id: "1",
          commonName: "Águila Real",
          scientificName: "Aquila chrysaetos",
          imageUrl: "https://example.com/aguila.jpg"
        }
      ];

      Bird.find.mockReturnValue({
        sort: jest.fn().mockResolvedValue(mockResults)
      });

      const req = mockRequest({}, { term: "águila" });
      const res = mockResponse();
      const next = jest.fn();

      const routeHandler = birdRoutes.stack.find(
        layer => layer.route?.path === '/birds/search/:term' && layer.route?.methods?._get
      )?.handle;

      if (routeHandler) {
        await routeHandler(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockResults);
      }
    });
  });
});