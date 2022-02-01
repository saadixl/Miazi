import { combineReducers } from 'redux';
import newsfeedReducer from './Newsfeed/newsfeed.reducer';

const reducers = combineReducers({
    newsfeed: newsfeedReducer,
});

export default reducers;