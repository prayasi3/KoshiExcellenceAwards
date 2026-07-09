import dotenv from "dotenv";
import express from "express";
import cors from "cors";

// IMPORTANT: ensure DB initializes
import { connectDB } from "./config/db.js";

import { authRoutes } from "./routes/authRoutes.js";
import { categoryRoutes } from "./routes/categoryRoutes.js";
import { editionRoutes } from "./routes/editionRoutes.js";
import { galleryRoutes } from "./routes/galleryRoutes.js";
import { honoreeRoutes } from "./routes/honoreeRoutes.js";
import { recipientRoutes } from "./routes/recipientRoutes.js";
import { speakerRoutes } from "./routes/speakerRoutes.js";
import { sponsorRoutes } from "./routes/sponsorRoutes.js";
import { teamRoutes } from "./routes/teamRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { sendSuccess } from "./utils/apiResponse.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// test route
app.get("/", (req, res) => {
  return sendSuccess(res, 200, "Backend running", {
    service: "Koshi Excellence Awards API",
  });
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/editions", editionRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/recipients", recipientRoutes);
app.use("/api/honorees", honoreeRoutes);
app.use("/api/sponsors", sponsorRoutes);
app.use("/api/speakers", speakerRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
