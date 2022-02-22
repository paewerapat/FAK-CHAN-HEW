import { CART_TYPES } from "../actions/cartAction"


const initialState = {
    myCart: []
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_TYPES.ADD_CART:
            return {
                ...state,
                myCart: [action.payload, ...state.myCart]
            }
        case CART_TYPES.GET_CART:
            return {
                ...state,
                myCart: action.payload
            }
        case CART_TYPES.UPDATE_CART:
            return {
                ...state,
                myCart: action.payload
            }
        case CART_TYPES.DELETE_ALL_CART:
            return {
                ...state,
                myCart: []
            }
        default:
            return state
    }
}

export default cartReducer