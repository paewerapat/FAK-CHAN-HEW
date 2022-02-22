import { DeleteData, EditData } from "../actions/globalTypes";
import { PRODUCTSALE_TYPES } from "../actions/productSaleAction";

const initialState = {
    loading: false,
    productSale: [],
}

const saleProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTSALE_TYPES.CREATE_PRODUCTSALE:
            return {
                ...state,
                productSale: [action.payload, ...state.productSale]
            }
        case PRODUCTSALE_TYPES.GET_PRODUCTSALE:
            return {
                ...state,
                productSale: action.payload.productSale,
                result: action.payload.result,
            }
        default:
            return state
    }
}

export default saleProductReducer