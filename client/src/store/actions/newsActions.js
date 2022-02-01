import { LIST_NEWS, NEWS_ERROR } from '../types';
import axios from 'axios';
import { NEWSFEED_API_URL } from '../../Constants';

export const listNews = () => async dispatch => {
    try {
        const res = await axios.get(NEWSFEED_API_URL);
        dispatch( {
            type: LIST_NEWS,
            payload: res.data
        });
    }
    catch(e) {
        dispatch({
            type: NEWS_ERROR,
            payload: console.log(e),
        });
    }
}