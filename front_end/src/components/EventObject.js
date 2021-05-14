import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class EventObject extends Component {

    getStyle = () => {
        return({
            backgroundColor: this.props.event_info.reminder_set ? '#db1616' : '#f4f4f4'
        })
    }

    render() {
        const { event_name, event_date, id, weather, visibility, temp } = this.props.event_info;

        if(weather === undefined || visibility === undefined || temp === undefined){
            return (
                <div data-testid="event-obj-div" style= { this.getStyle() }>
                    <h2>{event_name}</h2>
                    <h3>{event_date}</h3>
                    <button onClick={this.props.setReminder.bind(this, id)}>Create Reminder</button>
                </div>
            )
        }
        else{
            return (
                <div data-testid="event-obj-div" style= { this.getStyle() }>
                    <h2>{event_name}</h2>
                    <h3>{event_date}</h3>
                    <h3>Weather: {weather}</h3>
                    <h3>Visibility: {visibility}</h3>
                    <h3>Temp: {temp}&deg;C</h3>
                    <button onClick={this.props.setReminder.bind(this, id)}>Create Reminder</button>
                </div>
            )
        }
        
        
    }
}


// PropTypes
EventObject.propTypes = {
    event_info: PropTypes.object.isRequired,
    setReminder: PropTypes.func.isRequired
}

export default EventObject
