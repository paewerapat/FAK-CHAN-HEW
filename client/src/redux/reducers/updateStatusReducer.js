import { GLOBALTYPES } from "../actions/globalTypes";


const updateStatusReducer = (state = false, action) => {
    switch (action.type) {
        case GLOBALTYPES.STATUS_PRODUCT:
            return action.payload;
        default:
            return state
    }
}

export default updateStatusReducer