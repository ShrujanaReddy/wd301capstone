import { useEffect } from "react";
import { fetchArticles } from "../../context/articles/actions";
import { useArticlesDispatch } from "../../context/articles/context";
import ArticleListItems from "./ArticleListItems";
import Filters from "./Filters";

const ArticleList: React.FC = () => {
  const dispatch = useArticlesDispatch();
  
  useEffect(() => {
    fetchArticles(dispatch);
  }, [dispatch]);

  return (
    <div className="grid grid-cols-4 gap-4 mr-4">
      <div className="col-span-3 bg-gray-200 rounded-2xl p-4">
        <ArticleListItems/>
      </div>
      <div className="bg-gray-200 rounded-2xl p-4">
        <Filters/>
      </div>
    </div>
  );
};

export default ArticleList;
