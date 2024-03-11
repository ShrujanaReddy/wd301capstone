import { useArticlesState } from "../../context/articles/context";

const ArticleListItems = () => {
  const state = useArticlesState();
  const { articles, isLoading, isError, errorMessage } = state || {};

  if (!articles || isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <>
      {articles.map((article: any) => (
        <div
          key={article.id}
          className="article block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="text-xl font-bold tracking-tight text-gray-800 dark:text-white">
            {article.title}
          </h5>
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-auto mt-2 mb-4 rounded-lg"
          />
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {article.summary}
          </p>
        </div>
      ))}
    </>
  );
};

export default ArticleListItems;
