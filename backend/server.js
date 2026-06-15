import dotenv from "dotenv";
import express from "express";
import { categoryRoutes } from "./routes/categoryRoutes.js";
import { editionRoutes } from "./routes/editionRoutes.js";
import { recipientRoutes } from "./routes/recipientRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Koshi Excellence Awards Backend Running");
});

app.use("/api/editions", editionRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/recipients", recipientRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
