import NewsCard from "./NewsCard";

export default function FeaturedNews({ article }) {
  return article ? <NewsCard article={article} featured /> : null;
}
