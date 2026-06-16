import { Sponsor } from "../models/Sponsor.js";

const sponsorFields = [
  "edition_id",
  "sponsor_name",
  "logo_url",
  "website",
  "sponsor_level",
  "display_order",
];

const getSponsorPayload = (body) => {
  const payload = {};

  sponsorFields.forEach((field) => {
    if (body[field] !== undefined) {
      payload[field] = body[field];
    }
  });

  return payload;
};

// GET all sponsors
export const getAllSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsor.findAll({
      order: [["display_order", "ASC"]],
    });

    res.status(200).json(sponsors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET single sponsor
export const getSponsorById = async (req, res) => {
  try {
    const sponsor = await Sponsor.findByPk(req.params.id);

    if (!sponsor) {
      return res.status(404).json({ message: "Sponsor not found" });
    }

    res.status(200).json(sponsor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE sponsor
export const createSponsor = async (req, res) => {
  try {
    const payload = getSponsorPayload(req.body);
    const sponsor = await Sponsor.create(payload);

    res.status(201).json(sponsor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE sponsor
export const updateSponsor = async (req, res) => {
  try {
    const sponsor = await Sponsor.findByPk(req.params.id);

    if (!sponsor) {
      return res.status(404).json({ message: "Sponsor not found" });
    }

    await sponsor.update(getSponsorPayload(req.body));

    res.status(200).json(sponsor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE sponsor
export const deleteSponsor = async (req, res) => {
  try {
    const sponsor = await Sponsor.findByPk(req.params.id);

    if (!sponsor) {
      return res.status(404).json({ message: "Sponsor not found" });
    }

    await sponsor.destroy();

    res.status(200).json({
      message: "Sponsor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
