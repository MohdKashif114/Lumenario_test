import articlesData from '../../sample_data/article_scores.json';


export const fetchArticles = () => {
  return Promise.resolve(articlesData);
};


export const fetchArticleById = (id) => {
  const article = articlesData.find(art => art.article_id === id);
  if (article) {
    return Promise.resolve(article);
  }
  return Promise.reject(new Error(`Article with ID "${id}" not found.`));
};
