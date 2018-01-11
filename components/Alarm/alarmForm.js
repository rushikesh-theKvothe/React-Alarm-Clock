import React, { Component } from 'react'
import _ from 'lodash'
import getPath from 'lodash/get';
import setIn from 'lodash/fp/set';

export default class AlarmForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            formState: props.data ? props.data : {}
        }
        this.onInputChange = this.onInputChange.bind(this)
        this.onFrequencyChange = this.onFrequencyChange.bind(this)
    }

    onInputChange(eve) {       
        let { name, value, type, checked } = eve.target

        let formState = _.clone(this.state.formState)
        if (type == 'checkbox') {
            formState[name] = checked;
        } else {
            formState[name] = value;
        }
        this.setState({ formState })

    }

    onFrequencyChange(eve) {
        let { name, value, checked } = eve.target
        
        let values = getPath(this.state.formState, name, []);
        if (checked) {
            values = [...values, value];
        } else {
            values = values.filter(v => v !== value);
        }
        let formState = _.cloneDeep(this.state.formState)
        formState[name] = values
        this.setState({ formState: formState });
    }

    getMinutesOptions() {
        let minutesOptions = []
        for (let i = 0; i < 61; i++) {
            minutesOptions.push(String(i).length == 1 ? "0" + String(i) : String(i))
        }
        return minutesOptions;
    }

    getHoursOptions() {
        return ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"]
    }

    render() {
        let { saveFormFn, editFormFn, deleteFormFn, currentAction } = this.props
        let hoursOptions = this.getHoursOptions()
        let minutesOptions = this.getMinutesOptions()
        let { hours, minutes, timeType, snooze, frequency } = this.state.formState
        frequency = frequency ? frequency : []
        let weekOptions = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        return (
            <div style={styles['main-container']}>
                <div className="row main">
                    <form className="">

                        <div className="row">
                            <label for="name" className="cols-lg-2 control-label">Select Time</label>
                            <div className="cols-lg-10">
                                <div className="input-group">
                                    <div className="col-lg-4">
                                        <select className="form-control" name="hours" value={hours} onChange={this.onInputChange}>
                                            <option> HH </option>
                                            {
                                                hoursOptions.map((val) => {
                                                    return <option value={val} >{val}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-lg-4">
                                        <select name="minutes" className="form-control" value={minutes} onChange={this.onInputChange}>
                                            <option> MM </option>
                                            {
                                                minutesOptions.map((val) => {
                                                    return <option value={val} > {val}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-lg-4">
                                        <select name="timeType" className="form-control" value={minutes} onChange={this.onInputChange}>
                                            <option value="">Select</option>
                                            <option value="am">AM</option>
                                            <option value="pm"> PM </option>
                                        </select>
                                    </div>



                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div class="span12">
                                <label> Snooze <input type="checkbox" name="snooze" checked={snooze} onChange={this.onInputChange} /></label>
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group">
                                <label for="label" className="control-label col-lg-2">Label</label>
                                <input type="text" className="form-control col-lg-10" name="label" onChange={this.onInputChange} id="label" placeholder="Enter Alarm Label" />
                            </div>
                        </div>

                        <div class="row">
                            <div className="span12"> <label>Repeat</label> </div>
                            <div className="span12 pagination-centered">

                                {
                                    weekOptions.map((day) => {
                                        return (
                                            <div className="checkbox">
                                                <label><input type="checkbox" name="frequency" checked={_.includes(frequency, day)} onChange={this.onFrequencyChange} value={day} />{day}</label>
                                            </div>
                                        )
                                    })
                                }


                            </div>
                        </div>



                        <div className="form-group ">
                            <div className="col-lg-4">
                                <button type="button" id="buttonSave"
                                    onClick={() => {
                                        let formState = _.cloneDeep(this.state.formState)
                                        if (currentAction.toUpperCase() == 'EDIT') {
                                            editFormFn(formState)
                                        } else {
                                            saveFormFn(formState)
                                        }
                                    }}
                                    className="btn btn-primary">Save</button>
                                {currentAction == "Add" ? null : <button
                                    type="button"
                                    id="buttonDelete"
                                    onClick={() => { confirm('Do you really want to delete this alarm ? ') ? deleteFormFn() : null }}
                                    className="btn btn-danger ">Delete</button>}
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        )

    }

}

const styles = {
    'main-container': {
        paddingLeft: '50px',
        paddingTop: '10px',
        width: '80%'
    }
}
