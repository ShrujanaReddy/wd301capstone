import { useEffect } from "react";
import { fetchMatches } from "../../context/matches/actions";
import { useMatchesDispatch } from "../../context/matches/context";
import MatchListItems from "./MatchListItems";

const MatchList: React.FC = () => {
  const dispatch = useMatchesDispatch();
  
  useEffect(() => {
    fetchMatches(dispatch);
  }, [dispatch]);

  return (
    <div className="grid gap-4 grid-cols-4 mt-5">
          <MatchListItems />
    </div>
  );
};

export default MatchList;