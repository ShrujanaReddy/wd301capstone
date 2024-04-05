import React, { useEffect, Suspense } from "react";
import { fetchArticles } from "../../context/articles/actions";
import { useArticlesDispatch } from "../../context/articles/context";
import { usePreferencesDispatch } from "../../context/preferences/context";
import { fetchPreferences } from "../../context/preferences/actions";
import FavListItems from "./FavListItems";
import ErrorBoundary from "../../components/ErrorBoundary";

const ArticleList: React.FC = () => {
  const authtoken=localStorage.getItem('authToken') || ""
  const dispatch = useArticlesDispatch();
  const pdispatch=usePreferencesDispatch();
  useEffect(()=> {
    fetchPreferences(pdispatch,authtoken);
  }, [pdispatch]);
  useEffect(() => {
    fetchArticles(dispatch);
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <div className="grid grid-cols gap-4">
          <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
            <FavListItems/>
          </Suspense>
        </div>
    </ErrorBoundary>
  );
};

export default ArticleList;