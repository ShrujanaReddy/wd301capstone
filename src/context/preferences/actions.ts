import { API_ENDPOINT } from '../../config/constants';
import { SetPreferences, Preferences } from './reducer';

export const fetchPreferences = async (dispatch: any, authToken: string) => {
  try {
    dispatch({ type: "FETCH_PREFERENCES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch preferences');
    }

    const data = await response.json();
    dispatch({ type: "FETCH_PREFERENCES_SUCCESS", payload: data.preferences });
  } catch (error) {
    console.error('Error fetching preferences:', error);
    dispatch({ type: "FETCH_PREFERENCES_FAILURE", payload: 'Unable to load preferences' });
  }
};

export const updatePreferences = async (dispatch: any, newPreferences: Preferences, authToken: string) => {
  try {
    dispatch({ type: "UPDATE_PREFERENCES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ preferences: newPreferences }),
    });

    if (!response.ok) {
      throw new Error('Failed to update preferences');
    }

    const data = await response.json();
    dispatch({ type: "UPDATE_PREFERENCES_SUCCESS", payload: data.preferences });
  } catch (error) {
    console.error('Error updating preferences:', error);
    dispatch({ type: "UPDATE_PREFERENCES_FAILURE", payload: 'Unable to update preferences' });
  }
};
