import { ADD_ALARM, EDIT_ALARM, CLOSE_ACTIVE_ALARM_MODAL, CLOSE_ALARM_EDIT_MODAL, DELETE_ALARM, SET_CURRENT_ALARM, SET_CURRENT_ALARM_INDEX, SHOW_ACTIVE_ALARM_MODAL, SHOW_ALARM_EDIT_MODAL } from './types';
import { Link, browserHistory, hashHistory, withRouter } from 'react-router';

export function saveAlarm(alarmInfo) {
    return {
        type: ADD_ALARM,
        payload: alarmInfo
    }
}

export function editAlarm(alarmInfo, index) {
    return {
        type: EDIT_ALARM,
        payload: alarmInfo,
        index: index
    }
}

export function deleteAlarm(index) {
    return {
        type: DELETE_ALARM,
        index: index
    }
}

export function setCurrentAlarm(alarmInfo, index) {
    return {
        type: SET_CURRENT_ALARM,
        index: index,
        payload: alarmInfo
    }
}

export function openAlarmFormModal(payload){
    return {
        type: SHOW_ALARM_EDIT_MODAL,
        payload:payload
    }
}

export function closeAlarmFormModal(payload){
    return {
        type: CLOSE_ALARM_EDIT_MODAL,
        payload:payload
    }
}

export function openActiveAlarmModal(payload){
    return {
        type: SHOW_ACTIVE_ALARM_MODAL,
        payload:payload
    }
}

export function closeActiveAlarmModal(payload){
    return {
        type: CLOSE_ACTIVE_ALARM_MODAL,
        payload:payload
    }
}

module.exports = {
    saveAlarm,
    editAlarm,
    deleteAlarm,
    setCurrentAlarm,
    openAlarmFormModal,
    closeAlarmFormModal,
    openActiveAlarmModal,
    closeActiveAlarmModal

};
