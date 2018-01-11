import React, { Component } from 'react'
import moment from 'moment';
let clockInterval 
class Clock extends Component {
    constructor(props) {
        super(props)
        let now = new Date()
        this.state = {
            currentDate: moment(now).format('ddd DD MMM YYYY'),
            currentTime: moment(now).format('HH:mm:ss')
        }
    }

    componentDidMount() {
        clockInterval  = setInterval(() => {
            let date = new Date()
            this.setState({ currentDate: moment(date).format('ddd DD MMM YYYY'), currentTime: moment(date).format('HH:mm:ss') })
        }, 200)
    }

    componentWillUnmount(){
        clearInterval(clockInterval);    
    }

    render() {
        let { currentDate, currentTime } = this.state
        return (<div className="container panel panel-info text-center">
            <div style={styles.timeStyle} className="panel-header">
                {currentTime}
            </div>
            <div style={{ fontSize: '16px' }} className="panle-body">{currentDate}</div>
            <div className="clearfix"></div>

        </div>)
    }
}

const styles = {
    timeStyle: {
        fontSize: '32px',
        fontWeight: 'bold'
    }
}

export default Clock;