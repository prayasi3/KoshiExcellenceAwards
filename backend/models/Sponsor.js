import { DataTypes } from "sequelize";
import { db } from "../config/db.js";
import { Edition } from "./Edition.js";

export const Sponsor = db.define(
  "Sponsor",
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

    sponsor_name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    logo_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    website: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    sponsor_level: {
      type: DataTypes.ENUM("title", "platinum", "gold", "silver", "partner"),
      allowNull: true,
    },

    display_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    tableName: "sponsors",
    timestamps: false,
  }
);

Sponsor.belongsTo(Edition, { foreignKey: "edition_id" });
