import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Clock from './clock';
import Alarm from './Alarm';
class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <ul className="list-inline">
                        <li className="list-inline-item"><Link to={'/'}>Home</Link></li>
                        <li className="list-inline-item"><Link to={'/alarms'}>Alarms</Link></li>
                    </ul>
                    <hr />

                    <Switch>
                        <Route exact path='/' component={Clock} />
                        <Route exact path='/alarms' component={Alarm} />
                    </Switch>
                </div>
            </Router>
        );
    }
}
export default App;