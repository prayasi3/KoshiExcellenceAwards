import { Speaker } from "../models/Speaker.js";
import {
  findPaginated,
  getEditionInclude,
  hasBlankValue,
  pickFields,
  requireFound,
  requirePresent,
  requireValue,
} from "./serviceUtils.js";

const speakerFields = [
  "edition_id",
  "name",
  "designation",
  "organization",
  "bio",
  "image_url",
  "linkedin_url",
  "display_order",
  "created_at",
  "updated_at",
];

export const getSpeakers = async (query) =>
  findPaginated(Speaker, query, {
    allowedFilters: ["edition_id"],
    defaultOrder: [["display_order", "ASC"]],
    sortableFields: ["id", "name", "display_order", "created_at"],
    include: getEditionInclude(query),
    allowedSpecialFilters: ["edition"],
  });

export const getSpeaker = async (id) =>
  requireFound(await Speaker.findByPk(id), "Speaker not found");

export const createSpeakerRecord = async (body) => {
  const payload = pickFields(body, speakerFields);

  requirePresent(payload.edition_id, "Edition ID is required");
  requireValue(payload.name, "Name is required");

  return Speaker.create(payload);
};

export const updateSpeakerRecord = async (id, body) => {
  const speaker = requireFound(await Speaker.findByPk(id), "Speaker not found");
  const payload = pickFields(body, speakerFields);

  if (payload.edition_id !== undefined) {
    requirePresent(payload.edition_id, "Edition ID is required");
  }

  if (payload.name !== undefined && hasBlankValue(payload.name)) {
    requireValue(payload.name, "Name is required");
  }

  await speaker.update({
    ...payload,
    updated_at: new Date(),
  });

  return speaker;
};

export const deleteSpeakerRecord = async (id) => {
  const speaker = requireFound(await Speaker.findByPk(id), "Speaker not found");
  await speaker.destroy();
};
