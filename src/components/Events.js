import React, { Component } from 'react';
import EventObject from './EventObject.js';
import PropTypes from 'prop-types';

class Events extends Component {    
    render(){
        return this.props.event_list.map((event) =>
            <EventObject key={event.id} event_info={event} setReminder={this.props.setReminder} />
        );
    }
}


// PropTypes
Events.propTypes = {
    event_list: PropTypes.array.isRequired,
    setReminder: PropTypes.func.isRequired
}

export default Events;