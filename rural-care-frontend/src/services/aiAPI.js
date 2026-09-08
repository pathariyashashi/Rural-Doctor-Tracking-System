import api from "./api";

export const predictDisease = (data) =>
  api.post("/ai/predict", data);

export const predictionHistory = () =>
  api.get("/ai/history");