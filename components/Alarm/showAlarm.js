import React, { Component } from 'react'
import Clock from '../clock'
class ShowAlarm extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        let { activeAlarm } = this.props
        return (
            <div className="panel panel-info">
                <div className="panel-body">
                    <div className="row">
                        <Clock />
                    </div>
                    <div className="row">
                        <div className="col-lg-4">{` ${activeAlarm.hours} : ${activeAlarm.minutes} ${activeAlarm.timeType.toUpperCase()}`}</div>
                        <div className="col-lg-4">{` ${activeAlarm.label}`}</div>
                        <audio showControls="false" />
                    </div>
                    
                    <audio  autoPlay controls>
                        <source src="../../audio-files/censor-beep-10.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>

                    {activeAlarm.snooze ? <button className="btn btn-default" onClick={() => { this.props.snoozeFn(); }}> Sooze </button> : null}
                    <button className="btn btn-primary" onClick={() => { this.props.stopFn(); }}> Stop </button>
                </div>
            </div>
        )
    }
}

export default ShowAlarm;