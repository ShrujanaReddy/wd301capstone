import React, { useEffect, Suspense } from "react";
import { fetchArticles } from "../../context/articles/actions";
import { useArticlesDispatch } from "../../context/articles/context";
import ArticleListItems from "./ArticleListItems";
import Filters from "./Filters";
import ErrorBoundary from "../../components/ErrorBoundary";

const ArticleList: React.FC = () => {
  const dispatch = useArticlesDispatch();
  
  useEffect(() => {
    fetchArticles(dispatch);
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <div className="grid grid-cols-4 gap-4 mr-4 ">
        <div className="col-span-3 bg-gray-200 rounded-2xl p-4 dark:bg-gray-800 dark:border-gray-700">
          <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
            <ArticleListItems/>
          </Suspense>
        </div>
        {/* <div className="bg-gray-200 rounded-2xl p-4"> */}
          <Filters/>
        {/* </div> */}
      </div>
    </ErrorBoundary>
  );
};

export default ArticleList;