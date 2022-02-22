import { LOCATION_TYPES } from "../actions/locationAction"


const initialState = {
    location: []
}

const locationReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOCATION_TYPES.CREATE_LOCATION:
            return {
                ...state,
                location: [action.payload, ...state.location]
            }
        case LOCATION_TYPES.GET_LOCATION:
            return {
                ...state,
                location: action.payload
            }
        default:
            return state
    }
}

export default locationReducer