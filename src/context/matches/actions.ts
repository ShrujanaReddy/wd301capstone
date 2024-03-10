import { API_ENDPOINT } from '../../config/constants';
import {Match} from './reducer';
export const fetchMatches = async (dispatch: any) => {
  try {
    dispatch({ type: "FETCH_MATCHES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/matches`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch matches');
    }

    const data = await response.json();
    dispatch({ type: "FETCH_MATCHES_SUCCESS", payload: data.matches });

    // Fetch match details for each match
    data.matches.forEach((match: Match) => {
      fetchMatchDetails(dispatch, match.id);
    });
  } catch (error) {
    console.error('Error fetching matches:', error);
    dispatch({ type: "FETCH_MATCHES_FAILURE", payload: 'Unable to load matches' });
  }
};

export const fetchMatchDetails = async (dispatch: any, matchId: number) => {
  try {
    dispatch({ type: "FETCH_MATCH_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/matches/${matchId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch match details');
    }

    const data = await response.json();
    dispatch({ type: "FETCH_MATCH_SUCCESS", payload: data });
  } catch (error) {
    console.error('Error fetching match details:', error);
    dispatch({ type: "FETCH_MATCH_FAILURE", payload: 'Unable to load match details' });
  }
};
