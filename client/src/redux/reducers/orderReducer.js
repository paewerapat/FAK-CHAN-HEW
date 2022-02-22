import { ORDER_TYPES } from '../actions/orderAction'


const initialState = {
    saleOrder: [],
    invoiceOrder: [],
    saleResult: 0,
    invoiceResult: 0
}

const orderReducer = (state = initialState, action) => {
    switch(action.type){
        case ORDER_TYPES.GET_ORDER_PRODUCTSALE: {
            return {
                ...state,
                saleOrder: action.payload.orderSaleProducts
            }
        }
        case ORDER_TYPES.ADD_ORDER_PRODUCTSALE:
            return {
                ...state,
                saleOrder: [action.payload, ...state.saleOrder]
            }
        case ORDER_TYPES.UPDATE_ORDER_PRODUCTSALE:
            return {
                ...state,
                
            }
        default:
            return state
    }
}


export default orderReducer