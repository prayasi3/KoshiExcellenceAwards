import { DataTypes } from "sequelize";
import { db } from "../config/db.js";
import { Edition } from "./Edition.js";

export const Speaker = db.define(
  "Speaker",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    edition_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Edition,
        key: "id",
      },
      onDelete: "CASCADE",
    },

    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    designation: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    organization: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    image_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    linkedin_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    display_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
    tableName: "speakers",
    timestamps: false,
  }
);

Speaker.belongsTo(Edition, {
  foreignKey: "edition_id",
  onDelete: "CASCADE",
});
