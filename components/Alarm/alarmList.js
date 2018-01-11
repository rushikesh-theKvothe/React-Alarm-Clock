import React, { Component } from 'react'

const AlarmList = ({ list, onAddAlarm, selectCurrentAlarmFn, currentAlarmIndex, onDeleteFn }) => {
    return (<div className="container panel panel-info">
        <div className='alarm-header-container panel-heading row'>
            <div className="col-lg-4" onClick={() => { onAddAlarm('Edit') }} >
                <button className="btn btn-default"> Edit Alarm</button>
            </div>
            <div className="col-lg-4 text-center">
                <h4>Alarm List</h4>
            </div>
            <div className="col-lg-4" onClick={() => { onAddAlarm('Add') }} >
                <button className="btn btn-primary pull-right">Add Alarm</button></div>
        </div>
        <div className="list-container panel-body" >
            <ul className="list-group">
                {
                    list.map((alarm, index) => {
                        let frequency = alarm.frequency ? alarm.frequency : []
                        frequency = frequency.length == 7 ? "Everyday" : frequency.join()
                        return <li className="list-group-item">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div>{`${alarm.hours} : ${alarm.minutes} ${alarm.timeType}`}</div>
                                    <div>{alarm.label}</div>
                                    <div>{frequency}</div>
                                </div>
                                <div className="col-lg-4 pull-right">
                                    <div className="pull-right">

                                        <input type="checkbox"
                                            className="checkbox"
                                            checked={currentAlarmIndex == index}
                                            onChange={(eve) => { selectCurrentAlarmFn(alarm, index, eve.target.checked) }} />
                                    </div>
                                </div>
                            </div>
                            {/*  */}
                        </li>
                    })
                }
            </ul>
        </div>
    </div>)
}

export default AlarmList
