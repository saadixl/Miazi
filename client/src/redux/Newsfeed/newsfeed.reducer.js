import { LIST_NEWS } from './newsfeed.types';

const INITIAL_STATE = {
    newsfeed: {},
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LIST_NEWS:
            const newsfeed = {
                timestamp: Date.now()
            };
            return {
                ...state,
                newsfeed,
            };
         default: return state;

    }

};

export default reducer;