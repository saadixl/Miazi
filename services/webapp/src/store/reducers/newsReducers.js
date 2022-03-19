import { LIST_NEWS } from '../types';

const initialState = {
    loading: true
};

export default function(state = initialState, action) {
    switch(action.type){
        case LIST_NEWS:
            return {
                ...state,
                ...action.payload,
                loading: false
            }
        default: return state
    }
}