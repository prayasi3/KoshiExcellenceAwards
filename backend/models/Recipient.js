import { DataTypes } from "sequelize";
import { db } from "../config/db.js";
import { Category } from "./Category.js";
import { Edition } from "./Edition.js";

export const Recipient = db.define(
  "Recipient",
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
    },

    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
    },

    full_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    photo_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "recipients",
    timestamps: false,
  }
);

Recipient.belongsTo(Edition, { foreignKey: "edition_id" });
Recipient.belongsTo(Category, { foreignKey: "category_id" });
