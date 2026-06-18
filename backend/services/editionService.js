import { Edition } from "../models/Edition.js";
import { requireFound } from "./serviceUtils.js";

export const getEditions = async () => Edition.findAll();

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
