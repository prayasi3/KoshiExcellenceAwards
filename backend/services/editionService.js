import { Edition } from "../models/Edition.js";
import { Category } from "../models/Category.js";
import { EditionCategory } from "../models/EditionCategory.js";
import { db } from "../config/db.js";
import { AppError } from "../utils/AppError.js";
import { findPaginated, requireFound } from "./serviceUtils.js";

const editionFields = ["title", "year", "venue", "event_date", "status"];
const editionPayload = (body) => Object.fromEntries(editionFields.filter((field) => body[field] !== undefined).map((field) => [field, body[field]]));
const normalizeCategoryIds = (categoryIds = []) => [...new Set(categoryIds.map(Number))];

const validateCategoryIds = async (categoryIds, transaction) => {
  if (!categoryIds.length) return;
  const count = await Category.count({ where: { id: categoryIds }, transaction });
  if (count !== categoryIds.length) throw new AppError("One or more selected categories do not exist", 400);
};

const replaceEditionCategories = async (editionId, categoryIds, transaction) => {
  await EditionCategory.destroy({ where: { edition_id: editionId }, transaction });
  if (categoryIds.length) await EditionCategory.bulkCreate(categoryIds.map((category_id) => ({ edition_id: editionId, category_id })), { transaction });
};

export const getEditions = async (query) => findPaginated(Edition, query, {
  allowedFilters: ["year", "status"], defaultOrder: [["year", "DESC"]], sortableFields: ["id", "year", "event_date", "status", "created_at"],
});

export const getEdition = async (id) => requireFound(await Edition.findByPk(id), "Edition not found");

export const getEditionCategories = async (id) => {
  const edition = await getEdition(id);
  const mappings = await EditionCategory.findAll({ where: { edition_id: id }, attributes: ["category_id"], order: [["category_id", "ASC"]] });
  return { edition, categories: mappings.map((mapping) => mapping.category_id) };
};

export const createEditionRecord = async (body) => {
  const categoryIds = normalizeCategoryIds(body.category_ids);
  return db.transaction(async (transaction) => {
    await validateCategoryIds(categoryIds, transaction);
    const edition = await Edition.create(editionPayload(body), { transaction });
    await replaceEditionCategories(edition.id, categoryIds, transaction);
    return edition;
  });
};

export const updateEditionRecord = async (id, body) => db.transaction(async (transaction) => {
  const edition = requireFound(await Edition.findByPk(id, { transaction }), "Edition not found");
  await edition.update({ ...editionPayload(body), updated_at: new Date() }, { transaction });
  if (body.category_ids !== undefined) {
    const categoryIds = normalizeCategoryIds(body.category_ids);
    await validateCategoryIds(categoryIds, transaction);
    await replaceEditionCategories(edition.id, categoryIds, transaction);
  }
  return edition;
});

export const deleteEditionRecord = async (id) => db.transaction(async (transaction) => {
  const edition = requireFound(await Edition.findByPk(id, { transaction }), "Edition not found");
  await EditionCategory.destroy({ where: { edition_id: id }, transaction });
  await edition.destroy({ transaction });
});
