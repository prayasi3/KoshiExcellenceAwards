import { Edition } from "../models/Edition.js";
import { findPaginated, requireFound } from "./serviceUtils.js";

export const getEditions = async (query) =>
  findPaginated(Edition, query, {
    allowedFilters: ["year", "status"],
    defaultOrder: [["year", "DESC"]],
    sortableFields: ["id", "year", "event_date", "status", "created_at"],
  });

export const getEdition = async (id) =>
  requireFound(await Edition.findByPk(id), "Edition not found");

export const createEditionRecord = async (body) => Edition.create(body);

export const updateEditionRecord = async (id, body) => {
  const edition = requireFound(await Edition.findByPk(id), "Edition not found");

  await edition.update({
    ...body,
    updated_at: new Date(),
  });

  return edition;
};

export const deleteEditionRecord = async (id) => {
  const edition = requireFound(await Edition.findByPk(id), "Edition not found");
  await edition.destroy();
};
