import dotenv from "dotenv";
import express from "express";
import { editionRoutes } from "./routes/editionRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Koshi Excellence Awards Backend Running");
});

app.use("/api/editions", editionRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
