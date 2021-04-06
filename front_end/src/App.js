import { BrowserRouter as Router, Route } from 'react-router-dom'
import React, { Component } from 'react'
import Header from './components/layout/Header.js'
import Events from './components/Events.js'
import About from './components/pages/About.js'
import './App.css'

const request = require('request')

class App extends Component {
  state = {
    events: []
  }

  componentDidMount(){
    console.log("Component Mounted")
    //this.scrapeEvents()
  }

  // Function to request the backend server to scrape the events from the given url 
  scrapeEvents = () => {
      request('http://localhost:5000/events', (err, resp, html) =>{
        if(!err && resp.statusCode === 200){
          console.log(html)
          this.setState({events: JSON.parse(html)})
        }
      })
  }

  // Test function to set reminder based on hard-coded event details on the backend server 
  set_event_reminder = () => {
    request('http://localhost:5000/reminder', (err, resp, html) =>{
      if(!err && resp.statusCode === 200){
        console.log(html)
      }
    })
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
                {/* Temporary Web Scrape Button */}
                <button onClick={this.scrapeEvents}>Get Events</button>
                <button onClick={this.set_event_reminder}>Set Reminder</button>
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
