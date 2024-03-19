export interface Sport {
  id: number;
  name: string;
}

export interface Article {
  id: number;
  title: string;
  thumbnail: string;
  sport: Sport;
  date: string;
  summary: string;
  teams: { id: number; name: string }[]; 
  content?: string;
}

export interface ArticlesState {
  articleDetails: { [articleId: number]: Article };
  articles: Article[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export const initialState: ArticlesState = {
  articleDetails: {},
  articles: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export type ArticlesActions =
  | { type: "FETCH_ARTICLES_REQUEST" }
  | { type: "FETCH_ARTICLES_SUCCESS"; payload: Article[] }
  | { type: "FETCH_ARTICLES_FAILURE"; payload: string }
  | { type: "FETCH_ARTICLE_REQUEST" }
  | { type: "FETCH_ARTICLE_SUCCESS"; payload: Article }
  | { type: "FETCH_ARTICLE_FAILURE"; payload: string };

export const reducer = (
  state: ArticlesState = initialState,
  action: ArticlesActions,
): ArticlesState => {
  switch (action.type) {
    case "FETCH_ARTICLES_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_ARTICLES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        articles: action.payload,
      };
    case "FETCH_ARTICLES_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };
    case "FETCH_ARTICLE_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_ARTICLE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        articleDetails: {
          ...state.articleDetails,
          [action.payload.id]: action.payload,
        },
      };
    case "FETCH_ARTICLE_FAILURE":
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
