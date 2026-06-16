import { DataTypes } from "sequelize";
import { db } from "../config/db.js";
import { Edition } from "./Edition.js";

export const Gallery = db.define(
  "Gallery",
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

    media_type: {
      type: DataTypes.ENUM("image", "video"),
      allowNull: true,
    },

    media_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    caption: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "gallery",
    timestamps: false,
  }
);

Gallery.belongsTo(Edition, { foreignKey: "edition_id" });
