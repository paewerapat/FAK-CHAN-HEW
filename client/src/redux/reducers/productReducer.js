import { DeleteData, EditData } from "../actions/globalTypes";
import { PRODUCT_TYPES } from "../actions/productAction";

const initialState = {
    loading: false,
    products: [],
    result: 0,
    page: 2
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCT_TYPES.CREATE_PRODUCT:
            return {
                ...state,
                products: [action.payload, ...state.products]
            }
        case PRODUCT_TYPES.LOADING_PRODUCT:
            return {
                ...state,
                loading: action.payload
            }
        case PRODUCT_TYPES.GET_PRODUCTS:
            return {
                ...state,
                products: action.payload.products,
                // result: action.payload.result,
                // page: action.payload.page
            };
        case PRODUCT_TYPES.UPDATE_PRODUCT:
            return {
                ...state,
                products: EditData(state.products, action.payload._id, action.payload)
            };
        case PRODUCT_TYPES.DELETE_PRODUCT:
            return {
                ...state,
                products: DeleteData(state.products, action.payload._id)
            };
        default:
            return state
    }
}

export default productReducer