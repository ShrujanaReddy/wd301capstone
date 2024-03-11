import { API_ENDPOINT } from '../../config/constants';
import {Article} from './reducer';
export const fetchArticles = async (dispatch: any) => {
  try {
    dispatch({ type: "FETCH_ARTICLES_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/articles`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }

    const data = await response.json();
    dispatch({ type: "FETCH_ARTICLES_SUCCESS", payload: data });

    // Fetch match details for each match
    data.forEach((article: Article) => {
      fetchArticleDetails(dispatch, data.id);
    });
  } catch (error) {
    console.error('Error fetching articles:', error);
    dispatch({ type: "FETCH_ARTICLES_FAILURE", payload: 'Unable to load articles' });
  }
};

export const fetchArticleDetails = async (dispatch: any, articleId: number) => {
  try {
    dispatch({ type: "FETCH_ARTICLE_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/matches/${articleId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }

    const data = await response.json();
    dispatch({ type: "FETCH_ARTICLE_SUCCESS", payload: data });
  } catch (error) {
    console.error('Error fetching article details:', error);
    dispatch({ type: "FETCH_ARTICLE_FAILURE", payload: 'Unable to load article details' });
  }
};
