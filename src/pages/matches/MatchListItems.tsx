import { useMatchesState } from "../../context/matches/context";

const MatchListItems = () => {
  const state = useMatchesState();
  const { matches, isLoading, isError, errorMessage } = state || {};

  if (!matches || isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }
//   console.log(matches);
   const obj=Object.values(matches)
   const liveMatches = obj.filter((match) => match.isRunning);
   console.log(liveMatches)
  return (
    <>
      {liveMatches.map((match: any, index: number) => (
        <div
            key={match.id}
            className={`member block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}
        >
            <h5 className="mb-2 text-x font-bold tracking-tight text-gray-600 dark:text-white">
            {match.sportName}
            </h5>
            <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
            {match.teams[0].name} vs {match.teams[1].name}
            </h5>
            <h5 className="mb-2 text-x font-medium tracking-tight text-gray-600 dark:text-white">
            Location : {match.location}
            </h5>
        </div>
        ))}
    </>
  );
};

export default MatchListItems;
