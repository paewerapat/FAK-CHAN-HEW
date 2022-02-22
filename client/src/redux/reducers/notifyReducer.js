import { NOTIFY_TYPES } from '../actions/notifyAction'
import { EditData } from '../actions/globalTypes'


const initialState = {
    data: [],
    result: 0,
    sound: true
}

const notifyReducer = (state = initialState, action) => {
    switch (action.type) {
        case NOTIFY_TYPES.GET_NOTIFIES:
            return {
                ...state,
                data: action.payload.notifies,
                result: action.payload.result
            }
        case NOTIFY_TYPES.CREATE_NOTIFY:
            return {
                ...state,
                data: [action.payload, ...state.data]
            }
        case NOTIFY_TYPES.UPDATE_SOUND:
            return {
                ...state,
                sound: action.payload
            }
        case NOTIFY_TYPES.UPDATE_NOTIFY:
            return {
                ...state,
                data: EditData(state.data, action.payload.id, action.payload)
            }
        default:
            return state
    }
}

export default notifyReducer