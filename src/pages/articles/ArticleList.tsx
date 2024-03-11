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
    <div className="grid gap-4 grid-cols-4 mt-5">
          <ArticleListItems />
    </div>
  );
};

export default ArticleList;