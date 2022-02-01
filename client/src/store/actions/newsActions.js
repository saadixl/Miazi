import { LIST_NEWS, NEWS_ERROR } from '../types';
import axios from 'axios';

export const listNews = () => async dispatch => {
    console.log("listNews action called");
    try{
        const res = await axios.get(`http://jsonplaceholder.typicode.com/users`)
        dispatch( {
            type: LIST_NEWS,
            payload: res.data
        })
    }
    catch(e){
        dispatch( {
            type: NEWS_ERROR,
            payload: console.log(e),
        })
    }

}