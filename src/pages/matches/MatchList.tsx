import React, { useEffect, Suspense } from "react";
import { fetchMatches } from "../../context/matches/actions";
import { useMatchesDispatch } from "../../context/matches/context";
import MatchListItems from "./MatchListItems";
import ErrorBoundary from "../../components/ErrorBoundary";

const MatchList: React.FC = () => {
  const dispatch = useMatchesDispatch();
  
  useEffect(() => {
    fetchMatches(dispatch);
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<div className="suspense-loading">Loading...</div>}>
        <div className="grid gap-4 grid-cols-4 mt-5">
          <MatchListItems />
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default MatchList;