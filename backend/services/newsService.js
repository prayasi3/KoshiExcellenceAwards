import { News } from "../models/News.js";

export const getAllNews = async () => {
  return await News.findAll({
    order: [["published_at", "DESC"]],
  });
};

export const getNewsById = async (id) => {
  return await News.findByPk(id);
};

export const createNews = async (data) => {
  return await News.create(data);
};

export const updateNews = async (id, data) => {
  const news = await News.findByPk(id);

  if (!news) return null;

  await news.update(data);

  return news;
};

export const deleteNews = async (id) => {
  const news = await News.findByPk(id);

  if (!news) return false;

  await news.destroy();

  return true;
};