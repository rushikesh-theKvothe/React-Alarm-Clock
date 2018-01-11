import React from 'react';
import moment from 'moment';
import Modal from 'react-modal';
import { connect } from 'react-redux'
import _ from 'lodash';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import AlarmList from './alarmList';
import AlarmForm from './alarmForm';
import ShowAlarm from './showAlarm';
import { saveAlarm, deleteAlarm, editAlarm, setCurrentAlarm, closeAlarmFormModal, openAlarmFormModal, openActiveAlarmModal, closeActiveAlarmModal } from '../../actions'

class AlarmView extends React.Component {

    constructor(props) {
        super(props)        

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addAlarm = this.addAlarm.bind(this);
        this.selectCurrentAlarm = this.selectCurrentAlarm.bind(this);
        this.deleteAlarm = this.deleteAlarm.bind(this)

        this.checkActiveAlarm = this.checkActiveAlarm.bind(this)
        this.closeActiveAlarm = this.closeActiveAlarm.bind(this)

        this.editAlarmFn = this.editAlarmFn.bind(this)
    }

    openModal(action) {
        let payload = { isAlarmModalOpen: true, currentAction: action }
        if (action == 'Add') {
            payload.currentAlarmIndex = -1
            payload.currentAlarm = {}
        } else {

            let currentIndex = this.props.alarmReducer.currentAlarmIndex
            payload.currentAlarmIndex = currentIndex
            if (currentIndex < 0) {
                alert('Please select one of the alarms to edit')
                return;
            }
        }        
        this.props.openAlarmFormModal(payload)
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        //this.subtitle.style.color = '#f00';
    }

    closeModal() {        
        this.props.closeAlarmFormModal({ isAlarmModalOpen: false })
    }

    closeActiveAlarm() {        
        this.props.closeActiveAlarmModal({ isAlarmDetailsOpen: false, activeAlarm: {} })
    }

    addAlarm(alarmInfo) {        
        this.props.saveAlarm(alarmInfo)
        this.closeModal()
    }

    editAlarmFn(alarmInfo) {
        this.props.editAlarm(alarmInfo, this.props.alarmReducer.currentAlarmIndex)
    }

    componentDidMount() {
        setInterval(() => {
            this.checkActiveAlarm()
        }, 60000)
    }

    selectCurrentAlarm(alarm, index, checked) {
        let currentIndex = -1
        if (checked) {
            currentIndex = index
        }
        // this.setState({ currentAlarm: alarm, currentAlarmIndex: currentIndex })
        this.props.setCurrentAlarm(alarm, currentIndex)
    }

    deleteAlarm(alarmIndex) {
        this.props.deleteAlarm(alarmIndex)        
    }

    onAddAlarm() {
        alert('Alarm Form Open')
    }

    checkActiveAlarm() {
        let now = new Date()
        let hours = now.getHours()
        let minutes = now.getMinutes()

        let activeAlarm = _.filter(this.props.alarmReducer.alarmList, (alarm) => {
            let timeString = `${alarm.hours}:${alarm.minutes} ${alarm.timeType}`
            let momentString = moment(timeString, "h:mm:ss A").format("HH:mm")
            return momentString == `${hours}:${minutes}`
        })

        if (!_.isEmpty(activeAlarm)) {
            //this.setState({ isAlarmDetailsOpen: true, activeAlarm: activeAlarm[0] })
            this.props.openActiveAlarmModal({ isAlarmDetailsOpen: true, activeAlarm: activeAlarm[0] })
        }
    }

    render() {
        let alarmReducer = this.props.alarmReducer
        return (
            <div className="container">
                {/* <Clock /> */}
                <AlarmList
                    list={alarmReducer.alarmList}
                    onAddAlarm={this.openModal}
                    onDeleteFn={this.deleteAlarm}
                    selectCurrentAlarmFn={this.selectCurrentAlarm}
                    currentAlarmIndex={alarmReducer.currentAlarmIndex}
                />

                <Modal
                    isOpen={alarmReducer.isAlarmModalOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal">
                    <div className="bg-primary text-white modal-header">
                        <div className="col-lg-8">
                            <h4 ref={subtitle => this.subtitle = subtitle}>Alarm {this.props.alarmReducer.currentAction}</h4>
                        </div>
                        <div className="col-lg-4">
                            <div onClick={this.closeModal} className="pull-right"> <i class="fa fa-times" aria-hidden="true"></i></div>
                        </div>
                    </div>


                    <AlarmForm
                        currentAction={alarmReducer.currentAction}
                        saveFormFn={this.addAlarm}
                        editFormFn={this.editAlarmFn}
                        data={alarmReducer.currentAlarm}
                        deleteFormFn={this.deleteAlarm} />
                </Modal>


                <Modal
                    isOpen={this.props.alarmReducer.isAlarmDetailsOpen}
                    onRequestClose={this.closeActiveAlarm}
                    /* style={customStyles} */
                    shouldCloseOnOverlayClick={false}
                    contentLabel="Alarm Modal">
                    <div className="row">
                        <h2 ref={subtitle => this.subtitle = subtitle}>  Alarm Details </h2>
                    </div>
                    <ShowAlarm 
                        activeAlarm={this.props.alarmReducer.activeAlarm} 
                        snoozeFn={this.closeActiveAlarm} 
                        stopFn={this.closeActiveAlarm} />
                </Modal>


            </div>
        )
    }
}

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content: {
        top: '50%',
        left: '50%',
        width: '60%',
        right: 'auto',
        padding: '0px',
        bottom: 'auto',
        marginRight: '-30%',
        transform: 'translate(-50%, -50%)'
    },
    'modal-header': {
        paddingleft: '20px',
        paddingTop: '0px',
    }
};

function mapStateToProps(state) {
    return {
        alarmReducer: state.alarmReducer
    }
}

export default connect(mapStateToProps, { saveAlarm, deleteAlarm, editAlarm, setCurrentAlarm, closeAlarmFormModal, openAlarmFormModal, openActiveAlarmModal, closeActiveAlarmModal })(AlarmView);