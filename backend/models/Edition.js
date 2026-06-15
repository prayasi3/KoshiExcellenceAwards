import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

export const Edition = db.define(
  "Edition",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    venue: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    event_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("upcoming", "ongoing", "completed"),
      defaultValue: "upcoming",
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },

    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "editions",
    timestamps: false,
  }
);
