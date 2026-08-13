import { Category } from "../models/Category.js";
import { Edition } from "../models/Edition.js";
import { Gallery } from "../models/Gallery.js";
import { Honoree } from "../models/Honoree.js";
import { Recipient } from "../models/Recipient.js";
import { Sponsor } from "../models/Sponsor.js";
import { Team } from "../models/Team.js";
import { Contact } from "../models/Contact.js";
import { News } from "../models/News.js";
import { Speaker } from "../models/Speaker.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const getDashboardStats = async (req, res) => {
  try {
    const [
      editions,
      categories,
      recipients,
      honorees,
      sponsors,
      team,
      gallery,
      speakers,
      news,
      contacts,
    ] = await Promise.all([
      Edition.count(),
      Category.count(),
      Recipient.count(),
      Honoree.count(),
      Sponsor.count(),
      Team.count(),
      Gallery.count(),
      Speaker.count(),
      News.count(),
      Contact.count(),
    ]);

    return sendSuccess(res, 200, "Fetched successfully", {
      stats: {
        editions,
        categories,
        recipients,
        honorees,
        sponsors,
        team,
        gallery,
        speakers,
        news,
        contacts,
      },
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics.",
    });
  }
};