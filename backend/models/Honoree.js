import { DataTypes } from "sequelize";
import { db } from "../config/db.js";
import { Edition } from "./Edition.js";

export const Honoree = db.define(
  "Honoree",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    edition_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Edition,
        key: "id",
      },
    },

    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    image_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "honorees",
    timestamps: false,
  }
);

Honoree.belongsTo(Edition, { foreignKey: "edition_id" });
