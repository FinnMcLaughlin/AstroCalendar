import { BrowserRouter as Router, Route } from 'react-router-dom'
import React, { Component } from 'react'
import Header from './components/layout/Header.js'
import Events from './components/Events.js'
import About from './components/pages/About.js'
import './App.css';

class App extends Component {
  state = {
    events: [
      {
        id: 1,
        event_name: 'Lunar Eclipse',
        event_date: '05/04/2021',
        reminder_set: false
      },
      {
        id: 2,
        event_name: 'Mars Visible',
        event_date: '18/04/2021',
        reminder_set: false
      },
      {
        id: 3,
        event_name: 'Meteor Shower',
        event_date: '11/06/2021',
        reminder_set: false
      }
    ]
  }

  //Toggle set reminder on event
  setReminder = (id) => {
    this.setState({
      events: this.state.events.map(event => {  
        
        if(event.id === id){
          event.reminder_set = event.reminder_set ? false : true; 
        }
        return event;  
      })
    })
  }

  render(){
    return (
      <Router>
        <div className="App">
          <div className="container">
            
            {/* Home Page */}
            <Route exact path="/" render={props => (
              <React.Fragment>
                <Header />
                <Events event_list={this.state.events} setReminder={this.setReminder}/> 
              </React.Fragment>
            )}/>

            {/* About Page */}
            <Route path="/About" render={props => (
              <React.Fragment>
              <Header />
              <About /> 
            </React.Fragment>
            )}/>

          </div>
        </div>
      </Router>
    );
  }
}

export default App;
