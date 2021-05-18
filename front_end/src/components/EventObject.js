import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class EventObject extends Component {

    getStyle = () => {
        return({
            backgroundColor: this.props.event_info.reminder_set ? '#db1616' : '#f4f4f4'
        })
    }

    renderWeather = (weather_obj) => {
        const multiple_dates = this.props.event_info.weather.length > 1 ? true : false
        
        return(
            <React.Fragment key={weather_obj.forecast_date}>
                {multiple_dates ? (<h3>Date: {weather_obj.forecast_date}</h3>) : null}
                <h4>Weather: {weather_obj.forecast}</h4>
                <h4>Visibility: {weather_obj.visibility}</h4>
                <h4>Temp: {weather_obj.temp}&deg;C</h4>
            </React.Fragment>
        )
    }

    render() {
        const { event_name, event_date, id, weather} = this.props.event_info;

        if(weather === undefined){
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
                    {this.props.event_info.weather.map((weather_object) => {
                        return(this.renderWeather(weather_object))
                    })}
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
