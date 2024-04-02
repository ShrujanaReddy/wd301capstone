import React, { useEffect, Suspense } from "react";
import { fetchArticles } from "../../context/articles/actions";
import { useArticlesDispatch } from "../../context/articles/context";
import FavListItems from "./FavListItems";
import ErrorBoundary from "../../components/ErrorBoundary";

const ArticleList: React.FC = () => {
  const dispatch = useArticlesDispatch();
  
  useEffect(() => {
    fetchArticles(dispatch);
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <div className="grid grid-cols gap-4 overflow-x-scroll">
          <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
            <FavListItems/>
          </Suspense>
        </div>
    </ErrorBoundary>
  );
};

export default ArticleList;