import { Sponsor } from "../models/Sponsor.js";
import { pickFields, requireFound } from "./serviceUtils.js";

const sponsorFields = [
  "edition_id",
  "sponsor_name",
  "logo_url",
  "website",
  "sponsor_level",
  "display_order",
];

export const getSponsors = async () =>
  Sponsor.findAll({
    order: [["display_order", "ASC"]],
  });

export const getSponsor = async (id) =>
  requireFound(await Sponsor.findByPk(id), "Sponsor not found");

export const createSponsorRecord = async (body) =>
  Sponsor.create(pickFields(body, sponsorFields));

export const updateSponsorRecord = async (id, body) => {
  const sponsor = requireFound(await Sponsor.findByPk(id), "Sponsor not found");
  await sponsor.update(pickFields(body, sponsorFields));
  return sponsor;
};

export const deleteSponsorRecord = async (id) => {
  const sponsor = requireFound(await Sponsor.findByPk(id), "Sponsor not found");
  await sponsor.destroy();
};
