import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class EventObject extends Component {

    getStyle = () => {
        return({
            backgroundColor: this.props.event_info.reminder_set ? '#2837d7' : '#2837d7'
        })
    }

    renderWeather = (weather_obj) => {
        const multiple_dates = this.props.event_info.weather.length > 1 ? true : false
        
        return(
            <React.Fragment key={weather_obj.forecast_date}>
                {multiple_dates ? (<h3>Date: {weather_obj.forecast_date}</h3>) : null}
                <h3 style={{textTransform: 'capitalize'}}>{weather_obj.forecast}</h3>
                <h3>Visibility: {weather_obj.visibility}</h3>
                <h3>{weather_obj.temp}&deg;C</h3>
            </React.Fragment>
        )
    }

    render() {
        const { event_name, event_date, id, weather} = this.props.event_info;

        if(weather === undefined){
            return (
                <div data-testid="event-obj-div" style= { outerDivStyle }>
                    <div style={ eventDivStyle }>
                        <h2>{event_name}</h2>
                        <h3>{event_date}</h3>
                        <button onClick={this.props.setReminder.bind(this, id)}>Create Reminder</button>
                    </div>
                </div>
            )
        }
        else{
            return (
                    <div data-testid="event-obj-div" style= { outerDivStyle }>
                                    
                        <div style={ eventDivStyle }>
                            <h2>{event_name}</h2>
                            <h3>{event_date}</h3>
                            <button onClick={this.props.setReminder.bind(this, id)}>Create Reminder</button>
                            
                        </div>

                        <div style={ weatherDivStyle }>
                            {this.props.event_info.weather.map((weather_object) => {
                                return(this.renderWeather(weather_object))
                            })}
                        </div>   
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

const outerDivStyle = {
    backgroundColor: '#140956',
    color: 'white',
    width: '80%',
    margin: 'auto',
    display: 'flex',
    clear: 'both'
}

const eventDivStyle = {
    flex: '50%'
}

const weatherDivStyle = {
    flex: '50%'
}

export default EventObject
