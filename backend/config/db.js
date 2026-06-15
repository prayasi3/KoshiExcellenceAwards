import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

try {
  await sequelize.authenticate();
  console.log("MySQL Connected Successfully");
} catch (error) {
  console.error("MySQL Connection Failed:", error.message);
}

export const db = sequelize;
