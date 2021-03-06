import { SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, LOADING_DATA, DELETE_SCREAM, POST_SCREAM, SET_SCREAM, SUBMIT_COMMENT } from '../types';

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
        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload
            }
        case LIKE_SCREAM: //By doing this, the below code will apply for Both Like & Unlike Scream
        case UNLIKE_SCREAM:
            //Find the index of the scream where the scream Id == screamId take from action.payload
            let index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
            state.screams[index] = action.payload;
            //Need to check when we like a scream that in a singular scream state => we also need to update
            if (state.scream.screamId === action.payload.screamId) {
                let temp = state.scream.comments;
                state.scream = action.payload; //action.payload dont have the comments array, so need to save and update
                state.scream.comments = temp
            }
            return {
                ...state
            }
        case DELETE_SCREAM:
            return {
                ...state,
                screams: state.screams.filter(scream => scream.screamId !== action.payload)
            }
        case POST_SCREAM:
            return {
                ...state,
                screams: [
                    action.payload, //The newly posted screams
                    ...state.screams //The current screams
                ]
            }
        case SUBMIT_COMMENT:
            return {
                ...state,
                scream: {
                    ...state.scream,
                    comments: [action.payload, ...state.scream.comments]
                }
            };

        default:
            return state;
    }
}