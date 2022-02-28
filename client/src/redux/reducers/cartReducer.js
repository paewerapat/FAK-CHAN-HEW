import { CART_TYPES } from "../actions/cartAction"


const initialState = {
    myCart: []
}


export const addToCart = (data, seller, values) => {
    const newCart = data.map((item, index, array) => {
        if(item.seller_id === seller){
            item.details.find((detail) => {
                if(detail.sale_id !== values.details[0].sale_id){
                    item.details.push(values.details[0])
                }
            })
            return item
        }else{
            array.push(values)
            return array
        }
    })
    return newCart;
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case CART_TYPES.CREATE_CART:
            return {
                ...state,
                myCart: [action.payload, ...state.myCart]
            }
        case CART_TYPES.GET_CART:
            return {
                ...state,
                myCart: action.payload
            }
        case CART_TYPES.ADD_CART:
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