import { Honoree } from "../models/Honoree.js";
import {
  hasBlankValue,
  pickFields,
  requireFound,
  requireValue,
} from "./serviceUtils.js";

const honoreeFields = [
  "edition_id",
  "name",
  "title",
  "description",
  "image_url",
  "created_at",
];

export const getHonorees = async () => Honoree.findAll();

export const getHonoree = async (id) =>
  requireFound(await Honoree.findByPk(id), "Honoree not found");

export const createHonoreeRecord = async (body) => {
  const payload = pickFields(body, honoreeFields);
  requireValue(payload.name, "Name is required");
  return Honoree.create(payload);
};

export const updateHonoreeRecord = async (id, body) => {
  const honoree = requireFound(await Honoree.findByPk(id), "Honoree not found");
  const payload = pickFields(body, honoreeFields);

  if (payload.name !== undefined && hasBlankValue(payload.name)) {
    requireValue(payload.name, "Name is required");
  }

  await honoree.update(payload);
  return honoree;
};

export const deleteHonoreeRecord = async (id) => {
  const honoree = requireFound(await Honoree.findByPk(id), "Honoree not found");
  await honoree.destroy();
};
