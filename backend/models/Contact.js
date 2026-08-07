import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

export const Contact = db.define(
  "Contact",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING(50) },
    subject: { type: DataTypes.STRING },
    message: { type: DataTypes.TEXT },
  },
  {
    tableName: "contacts",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: false,
  }
);