import { useEffect } from "react";
import { fetchArticles } from "../../context/articles/actions";
import { useArticlesDispatch } from "../../context/articles/context";
import ArticleListItems from "./ArticleListItems";

const ArticleList: React.FC = () => {
  const dispatch = useArticlesDispatch();
  
  useEffect(() => {
    fetchArticles(dispatch);
  }, [dispatch]);

  return (
    <div className="w-3/4 bg-gray-300 rounded-2xl">
      <div>
        <br/>
        <ArticleListItems />
      </div>
    </div>
  );
};

export default ArticleList;
