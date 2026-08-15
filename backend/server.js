import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// IMPORTANT: ensure DB initializes
import { connectDB } from "./config/db.js";

import { authRoutes } from "./routes/authRoutes.js";
import { categoryRoutes } from "./routes/categoryRoutes.js";
import { contactRoutes } from "./routes/contactRoutes.js";
import { editionRoutes } from "./routes/editionRoutes.js";
import { galleryRoutes } from "./routes/galleryRoutes.js";
import { honoreeRoutes } from "./routes/honoreeRoutes.js";
import { recipientRoutes } from "./routes/recipientRoutes.js";
import { speakerRoutes } from "./routes/speakerRoutes.js";
import { sponsorRoutes } from "./routes/sponsorRoutes.js";
import { teamRoutes } from "./routes/teamRoutes.js";
import { newsRoutes } from "./routes/newsRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { sendSuccess } from "./utils/apiResponse.js";

dotenv.config();

const app = express();

app.set("trust proxy", true);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
const allowedOrigins = new Set(
  [
    process.env.FRONTEND_URL,
    process.env.CORS_ORIGINS,
    // Allows the local Vite admin panel to manage the production API.
    "http://localhost:5173",
  ]
    .filter(Boolean)
    .flatMap((origins) => origins.split(","))
    .map((origin) => origin.trim())
    .filter(Boolean)
);

app.use(
  cors({
    origin(origin, callback) {
      // Requests without an Origin header, such as health checks and server-to-server calls.
      if (!origin || allowedOrigins.has(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Origin not allowed by CORS: ${origin}`));
    },
    methods: ["GET", "HEAD", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// test route
app.get("/", (req, res) => {
  return sendSuccess(res, 200, "Backend running", {
    service: "Koshi Excellence Awards API",
  });
});

// Used by the load balancer and deployment platform to confirm that the
// Node process is alive without depending on the database-backed endpoints.
app.get("/api/health", (req, res) => {
  return sendSuccess(res, 200, "API is healthy", {
    service: "Koshi Excellence Awards API",
  });
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/editions", editionRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/recipients", recipientRoutes);
app.use("/api/honorees", honoreeRoutes);
app.use("/api/sponsors", sponsorRoutes);
app.use("/api/speakers", speakerRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin/dashboard", dashboardRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || "0.0.0.0";

const startServer = async () => {
  await connectDB();

  app.listen(PORT, HOST, () => {
    console.log(`Server running at http://${HOST}:${PORT}`);
  });
};

startServer();
