import React, { useEffect } from "react";
import { useMatchesDispatch, useMatchesState } from "../../context/matches/context";
import { fetchMatchDetails } from "../../context/matches/actions";

const MatchListItems = () => {
  const state = useMatchesState();
  const { matches, matchDetails, isLoading, isError, errorMessage } = state || {};
  const dispatch = useMatchesDispatch();

  const getTeamScore = (teamName: string, matchId: number) => {
    if (!matchDetails || !matchDetails[matchId]) {
      return "N/A";
    }

    const match = matchDetails[matchId];
    if (match.score) {
      return match.score[teamName] || "N/A";
    }
    return "N/A";
  };
  const getCurrentPlayingTeamName = (matchId: number) => {
    if (!matchDetails || !matchDetails[matchId]) {
      return "N/A";
    }

    const match = matchDetails[matchId];
    const playingTeam = match.teams.find((team) => team.id === match.playingTeam);
    return playingTeam ? playingTeam.name : "N/A";
  };

  useEffect(() => {
    if (matches.length > 0) {
      const runningMatches = matches.filter((match) => match.isRunning);
      runningMatches.forEach((match) => {
        fetchMatchDetails(dispatch, match.id);
      });
    }
  }, [matches, dispatch]);

  if (!matches || isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  const liveMatches = matches.filter((match) => match.isRunning);
console.log(liveMatches)
  return (
  <>
    {liveMatches.map((match: any, index: number) => (
      <div
        key={match.id}
        className={`member block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}
      >
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-800 dark:text-white">
          {match.sportName}
        </h5>
        <h5 className="mb-2 text-lg font-medium tracking-tight text-gray-700 dark:text-gray-300">
          {match.teams[0].name} vs {match.teams[1].name}
        </h5>
        <h5 className="mb-2 text-sm font-medium tracking-tight text-gray-600 dark:text-gray-400">
          <b>Location:</b> {match.location}
        </h5>
        <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-600 dark:text-gray-400">
          {match.teams[0].name}: {getTeamScore(match.teams[0].name, match.id)} 
        </h5>
        <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-600 dark:text-gray-400">
          {match.teams[1].name}: {getTeamScore(match.teams[1].name, match.id)}
        </h5>
        <h5 className="mb-2 text-sm font-medium tracking-tight text-gray-600 dark:text-gray-400">
          <b>Playing now :</b> {getCurrentPlayingTeamName(match.id)}
        </h5>
      </div>
    ))}
  </>
);
}

export default MatchListItems;
