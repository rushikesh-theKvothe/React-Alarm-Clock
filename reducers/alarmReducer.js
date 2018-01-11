import { ADD_ALARM, EDIT_ALARM, CLOSE_ACTIVE_ALARM_MODAL, CLOSE_ALARM_EDIT_MODAL, DELETE_ALARM, SET_CURRENT_ALARM, SET_CURRENT_ALARM_INDEX, SHOW_ACTIVE_ALARM_MODAL, SHOW_ALARM_EDIT_MODAL } from '../actions/types'

const INITIAL_STATE = {
    alarmList: [
        { label: "Alarm 1", tune: "Morning Walk", frequency: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], hours: "08", "minutes": "09", "timeType": "PM" },
        { label: "Alarm 2", tune: "Morning Walk", frequency: ["Monday"], hours: "08", "minutes": "00", "timeType": "AM" }
    ],
    isAlarmModalOpen: false, //modal for adding and editing alarm details
    isAlarmDetailsOpen: false, //for showing alarm 

    currentAlarm: {},
    currentAlarmIndex: -1,
    currentAction: 'Add',

    activeAlarm: {}
}
export default function alarmReducer(state = INITIAL_STATE, action) {

    switch (action.type) {

        case ADD_ALARM: {
            let alarmList = _.cloneDeep(state.alarmList)
            alarmList.push(action.payload)
            return Object.assign({}, state, { alarmList: alarmList, isAlarmModalOpen: false })
        }
        case EDIT_ALARM: {
            let alarmList = _.cloneDeep(state.alarmList)
            alarmList[action.index] = action.payload
            return Object.assign({}, state, { alarmList: alarmList, isAlarmModalOpen: false })
        }
        case DELETE_ALARM: {
            let alarmList = _.cloneDeep(state.alarmList)
            alarmList.splice(action.index, 1)
            return Object.assign({}, state, { alarmList: alarmList, isAlarmModalOpen: false })
        }
        case SET_CURRENT_ALARM: {
            return Object.assign({}, state, { currentAlarm: action.payload, currentAlarmIndex: action.index })
        }
        case SHOW_ACTIVE_ALARM_MODAL: {
            return Object.assign({}, state, { isAlarmDetailsOpen: true, activeAlarm: action.payload.activeAlarm })
        }
        case SHOW_ALARM_EDIT_MODAL: {
            return Object.assign({}, state, {
                isAlarmModalOpen: action.payload.isAlarmModalOpen,
                currentAction: action.payload.currentAction,
                currentAlarmIndex: action.payload.currentAlarmIndex,
                currentAlarm: action.payload.currentAlarm ? action.payload.currentAlarm : state.currentAlarm
            })
        }
        case CLOSE_ACTIVE_ALARM_MODAL: {
            return Object.assign({}, state, { isAlarmDetailsOpen: false, activeAlarm: action.payload.activeAlarm })
        }
        case CLOSE_ALARM_EDIT_MODAL: {
            return Object.assign({}, state, { isAlarmModalOpen: action.payload.isAlarmModalOpen })
        }

        default:
            return state;
    }
}
