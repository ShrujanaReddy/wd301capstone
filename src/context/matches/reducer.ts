export interface Match {
  id: number;
  name: string;
  location: string;
  sportName: string;
  isRunning: boolean;
  score?: { [teamName: string]: string }; // Optional score field
  teams: { id: number; name: string }[]; 
  playingTeam?: number;
}

export interface MatchesState {
  matchDetails: { [matchId: number]: Match };
  matches: Match[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export const initialState: MatchesState = {
  matchDetails: {},
  matches: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export type MatchesActions =
  | { type: "FETCH_MATCHES_REQUEST" }
  | { type: "FETCH_MATCHES_SUCCESS"; payload: Match[] }
  | { type: "FETCH_MATCHES_FAILURE"; payload: string }
  | { type: "FETCH_MATCH_REQUEST" }
  | { type: "FETCH_MATCH_SUCCESS"; payload: Match }
  | { type: "FETCH_MATCH_FAILURE"; payload: string };

export const reducer = (
  state: MatchesState = initialState,
  action: MatchesActions,
): MatchesState => {
  switch (action.type) {
    case "FETCH_MATCHES_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_MATCHES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        matches: action.payload,
      };
    case "FETCH_MATCHES_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case "FETCH_MATCH_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_MATCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        matchDetails: {
          ...state.matchDetails,
          [action.payload.id]: action.payload,
        },
      };
    case "FETCH_MATCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};
