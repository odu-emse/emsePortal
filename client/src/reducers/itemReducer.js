import { ADD_ITEM, GET_ITEMS, DELETE_ITEMS, MODULES_LOADING} from "../actions/types";

const initialState = {
    modules: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ITEMS:
            return {
                ...state,
                modules: action.payload,
                loading: false
            }
        case DELETE_ITEMS:
            return {
                ...state,
                modules: state.modules.filter(item => item.id !== action.payload)
            }
        case ADD_ITEM:
            return {
                ...state,
                modules: [action.payload, ...state.modules]
            }
        case MODULES_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state
    }
}