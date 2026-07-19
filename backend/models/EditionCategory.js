import { DataTypes } from "sequelize";
import { db } from "../config/db.js";

export const EditionCategory = db.define("EditionCategory", {
  edition_id: { type: DataTypes.INTEGER, primaryKey: true },
  category_id: { type: DataTypes.INTEGER, primaryKey: true },
}, { tableName: "edition_categories", timestamps: false });
