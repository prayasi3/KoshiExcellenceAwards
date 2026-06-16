import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

export const Team = db.define(
  "Team",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    full_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM(
        "chief_advisor",
        "chief_judge",
        "chairman",
        "executive_director",
        "director",
        "member"
      ),
      allowNull: false,
    },

    designation: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    photo_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    display_order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    role_priority: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    tableName: "teams",
    timestamps: false,
  }
);
