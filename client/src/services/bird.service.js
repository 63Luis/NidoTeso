import axios from "axios";

class BirdService {
  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:5000",
    });

    // Automatically set JWT token on the request headers for every request
    this.api.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("authToken");
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
      return config;
    });
  }

  // GET /api/birds - Get all birds
  getAllBirds = async () => {
    return this.api.get("/api/birds");
  };

  // GET /api/birds/:id - Get a single bird by ID
  getBirdById = async (id) => {
    return this.api.get(`/api/birds/${id}`);
  };

  // GET /api/birds/search/:term - Search birds by commonName or scientificName
  searchBirds = async (term) => {
    return this.api.get(`/api/birds/search/${term}`);
  };

  // POST /api/birds - Create a new bird (requires authentication)
  createBird = async (requestBody) => {
    return this.api.post("/api/birds", requestBody);
  };

  // PUT /api/birds/:id - Update a bird (requires authentication)
  updateBird = async (id, requestBody) => {
    return this.api.put(`/api/birds/${id}`, requestBody);
  };

  // DELETE /api/birds/:id - Delete a bird (requires authentication)
  deleteBird = async (id) => {
    return this.api.delete(`/api/birds/${id}`);
  };
}

const birdService = new BirdService();
export default birdService;