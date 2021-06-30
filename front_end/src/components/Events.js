import React, { Component } from 'react';
import EventObject from './EventObject.js';
import PropTypes from 'prop-types';

class Events extends Component {    
    render(){
        return (
            <div style={eventsDivStyle}>
                {this.props.event_list.map((event) =>
                    <EventObject  key={event.id} event_info={event} setReminder={this.props.setReminder} />
                )}
            </div>
        )
    }
}

const eventsDivStyle = {
    backgroundColor: '#090428',
    width: '50%',
    margin: 'auto',
}

// PropTypes
Events.propTypes = {
    event_list: PropTypes.array.isRequired,
    setReminder: PropTypes.func.isRequired
}

export default Events;