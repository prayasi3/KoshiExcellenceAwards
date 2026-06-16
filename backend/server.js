import dotenv from "dotenv";
import express from "express";
import { categoryRoutes } from "./routes/categoryRoutes.js";
import { editionRoutes } from "./routes/editionRoutes.js";
import { galleryRoutes } from "./routes/galleryRoutes.js";
import { honoreeRoutes } from "./routes/honoreeRoutes.js";
import { recipientRoutes } from "./routes/recipientRoutes.js";
import { speakerRoutes } from "./routes/speakerRoutes.js";
import { sponsorRoutes } from "./routes/sponsorRoutes.js";
import { teamRoutes } from "./routes/teamRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Koshi Excellence Awards Backend Running");
});

app.use("/api/editions", editionRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/recipients", recipientRoutes);
app.use("/api/honorees", honoreeRoutes);
app.use("/api/sponsors", sponsorRoutes);
app.use("/api/speakers", speakerRoutes);
app.use("/api/teams", teamRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
