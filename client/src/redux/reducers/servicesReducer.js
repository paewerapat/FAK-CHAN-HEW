import { SERVICES_TYPES } from "../actions/servicesAction"


const initialState = {
    distance_charge: 0,
    service_charge: 0
}

const servicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SERVICES_TYPES.GET_SERVICES_CHARGE:
            return {
                ...state,
                distance_charge: action.payload.distanceCharge,
                service_charge: action.payload.serviceCharge
            }
        case SERVICES_TYPES.UPDATE_SERVICE_CHARGE:
            return {
                ...state,
                service_charge: [action.payload.serviceCharge, ...state.service_charge]
            }
        case SERVICES_TYPES.UPDATE_DISTANCE_CHARGE:
            return {
                ...state,
                distance_charge: [action.payload.distanceCharge, ...state.distance_charge]
            }
        default:
            return state
    }
}

export default servicesReducer