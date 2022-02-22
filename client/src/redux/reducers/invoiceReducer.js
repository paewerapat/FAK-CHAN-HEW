import { INVOICE_TYPES } from '../actions/invoiceAction'


const initialState = {
    invoice: [],
    result: 0
}

const invoiceReducer = (state = initialState, action) => {
    switch (action.type) {
        case INVOICE_TYPES.CREATE_INVOICE:
            return {
                ...state,
                invoice: [action.payload, ...state.invoice]
            }
        case INVOICE_TYPES.GET_INVOICE:
            return {
                ...state,
                invoice: action.payload
            }
        default:
            return state
    }
}

export default invoiceReducer