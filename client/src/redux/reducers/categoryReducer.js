import { CATEGORY_TYPES } from "../actions/categoryAction";


export const EditData = (state, id, data) => {
    const newData = state.map(item => (item.category_id === id ? data : item) )
    return newData
}

export const DeleteData = (state, id) => {
    const newData = state.filter(item => item.category_id !== id)
    return newData
}

const initialState = {
    category: []
}

const categoryReducer = (state = initialState, action) => {
    switch(action.type) {
        case CATEGORY_TYPES.CREATE_CATEGORY:
            return {
                ...state,
                category: [action.payload, ...state.category]
            }
        case CATEGORY_TYPES.GET_CATEGORY:
            return {
                ...state,
                category: action.payload
            }
        case CATEGORY_TYPES.UPDATE_CATEGORY:
            return {
                ...state,
                category: EditData(state.category, action.payload.category_id, action.payload)
            }
        case CATEGORY_TYPES.DELETE_CATEGORY:
            return {
                ...state,
                category: DeleteData(state.category, action.payload.category_id)
            }
        default:
            return state
    }
}

export default categoryReducer