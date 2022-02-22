import { combineReducers } from "redux";
import auth from './authReducer'
import alert from './alertReducer'
import allProducts from './productReducer'
import allCategories from './categoryReducer'
import allProductSale from './productSaleReducer'
import order from './orderReducer'
import socket from './socketReducer'
import peer from './peerReducer'
import online from './onlineReducer'
import notify from './notifyReducer'
import updateStatus from './updateStatusReducer'
import allLocation from './locationReducer'
import allProductByLocation from './productByLocationReducer'
import services from './servicesReducer'
import invoices from './invoiceReducer'
import cart from './cartReducer'


export default combineReducers({
    auth,
    alert,
    allProducts,
    allCategories,
    allProductSale,
    allLocation,
    allProductByLocation,
    order,
    socket,
    peer,
    online,
    notify,
    updateStatus,
    invoices,
    services,
    cart
})