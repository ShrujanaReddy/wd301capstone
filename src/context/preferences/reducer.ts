export interface Sport {
  id: number;
  name: string;
}

export interface Team {
  id: number;
  name: string;
  sportId: number;
}

export interface Preferences {
  sports?: Sport[];
  teams?: Team[];
  articles?: number[];
  matches?: number[];
}

export interface SetPreferences {
  preferences: Preferences;
}

export interface PreferencesState {
  preferences: Preferences | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export const initialPreferencesState: PreferencesState = {
  preferences: null,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export type PreferencesActions =
  | { type: "FETCH_PREFERENCES_REQUEST" }
  | { type: "FETCH_PREFERENCES_SUCCESS"; payload: Preferences }
  | { type: "FETCH_PREFERENCES_FAILURE"; payload: string }
  | { type: "UPDATE_PREFERENCES_REQUEST" }
  | { type: "UPDATE_PREFERENCES_SUCCESS"; payload: Preferences }
  | { type: "UPDATE_PREFERENCES_FAILURE"; payload: string };

export const preferencesReducer = (
  state: PreferencesState = initialPreferencesState,
  action: PreferencesActions,
): PreferencesState => {
  switch (action.type) {
    case "FETCH_PREFERENCES_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_PREFERENCES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        preferences: action.payload,
      };
    case "FETCH_PREFERENCES_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case "UPDATE_PREFERENCES_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "UPDATE_PREFERENCES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        preferences: action.payload,
      };
    case "UPDATE_PREFERENCES_FAILURE":
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