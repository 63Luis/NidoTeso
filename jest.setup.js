// server/jest.setup.js
jest.setTimeout(30000);

// Variables de entorno para pruebas
process.env.TOKEN_SECRET = "test_secret_key_for_jest";
process.env.NODE_ENV = "test";

// Mock de mongoose para evitar conexión real a la base de datos
jest.mock("mongoose", () => {
  const actualMongoose = jest.requireActual("mongoose");
  return {
    ...actualMongoose,
    connect: jest.fn().mockImplementation(() => Promise.resolve({
      connections: [{ name: "test-db" }],
      disconnect: jest.fn()
    })),
    disconnect: jest.fn().mockImplementation(() => Promise.resolve(true))
  };
});