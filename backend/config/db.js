import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

// safer initialization function
export const connectDB = async () => {
  try {
    await db.authenticate();
    console.log("MySQL Connected Successfully");
  } catch (error) {
    console.error("MySQL Connection Failed:", error.message);
  }
};