import { PRODUCT_BY_LOCATION_TYPES } from '../actions/productByLocationAction'


const initialState = {
    productByLocation: []
}

const productByLocation = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_BY_LOCATION_TYPES.CREATE_PRODUCT_BY_LOCATION:
            return {
                ...state,
                productByLocation: [action.payload, ...state.productByLocation]
            }
        case PRODUCT_BY_LOCATION_TYPES.GET_PRODUCT_BY_LOCATION:
            return {
                ...state,
                productByLocation: action.payload
            }
        default:
            return state
    }
}

export default productByLocation