import * as newsService from "../services/newsService.js";
import { sendSuccess } from "../utils/apiResponse.js";

export const getNews = async (req, res) => {
  try {
    const news = await newsService.getAllNews();

    return sendSuccess(res, 200, "Fetched successfully", news);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getNewsById = async (req, res) => {
  try {
    const news = await newsService.getNewsById(req.params.id);

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    return sendSuccess(res, 200, "Fetched successfully", news);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createNews = async (req, res) => {
  try {
    const news = await newsService.createNews(req.body);

    return sendSuccess(res, 201, "Created successfully", news);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateNews = async (req, res) => {
  try {
    const news = await newsService.updateNews(
      req.params.id,
      req.body
    );

    if (!news) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    return sendSuccess(res, 200, "Updated successfully", news);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const deleted = await newsService.deleteNews(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "News not found",
      });
    }

    return sendSuccess(res, 200, "News deleted successfully", null);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};