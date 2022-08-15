import { Article } from "../interfaces/articles";

export const articlePath = (article: Article | null) => {
  if (!article) return "";
  return `/articles/${article.category.toLowerCase()}/${article.id}`;
};
