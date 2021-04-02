import React, { Component } from 'react'
import PropTypes from 'prop-types';

export class EventObject extends Component {

    getStyle = () => {
        return({
            backgroundColor: this.props.event_info.reminder_set ? '#db1616' : '#f4f4f4'
        })
    }

    render() {
        const { event_name, event_date, id } = this.props.event_info;
        
        return (
            <div style= { this.getStyle() }>
                <h2>{event_name}</h2>
                <h3>{event_date}</h3>
                <input type="checkbox" onChange={this.props.setReminder.bind(this, id)} />
            </div>
        )
    }
}


// PropTypes
EventObject.propTypes = {
    event_info: PropTypes.object.isRequired,
    setReminder: PropTypes.func.isRequired
}

export default EventObject
