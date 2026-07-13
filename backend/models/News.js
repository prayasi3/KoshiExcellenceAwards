import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

export const News = db.define(
  "News",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    slug: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },

    content: {
      type: DataTypes.TEXT("long"),
      allowNull: true,
    },

    featured_image: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    published_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "news",
    timestamps: false,
  }
);

export default News;