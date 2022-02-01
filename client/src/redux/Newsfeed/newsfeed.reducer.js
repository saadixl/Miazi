import { LIST_NEWS } from './newsfeed.types';

const INITIAL_STATE = {
    newsList: {},
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LIST_NEWS:
            const newsList = {
                timestamp: Date.now()
            };
            return {
                ...state,
                newsList,
            };
         default: return state;

    }

};

export default reducer;