import { SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA, DELETE_SCREAM } from '../types';

const initialState = {
    screams: [], //Array holdings all screams
    scream: {},
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            }
        case LIKE_SCREAM: //By doing this, the below code will apply for Both Like & Unlike Scream
        case UNLIKE_SCREAM:
            //Find the index of the scream where the scream Id == screamId take from action.payload
            let index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
            state.screams[index] = action.payload;
            return {
                ...state
            }
        case DELETE_SCREAM:
            return {
                ...state,
                screams: state.screams.filter(scream => scream.screamId !== action.payload)
            }
        default:
            return state;
    }
}