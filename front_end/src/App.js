import { BrowserRouter as Router, Route } from 'react-router-dom'
import React, { Component } from 'react'
import Header from './components/layout/Header.js'
import Events from './components/Events.js'
import About from './components/pages/About.js'
import SendEventReq from './services/SendEventReq.js'
import CreateEventObject from './services/CreateEventObj.js'
import ScrapeEvents from './services/ScrapeEvents.js'
import './App.css'

const LOCALHOST = 'http://localhost:5000'

const endpoints = {
  scrape_events: "/events",
  event_req: "/reminder"
}

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
    ScrapeEvents(LOCALHOST + endpoints.scrape_events).then((events_data) => {
      console.log(events_data)
      this.setState({events: events_data})
    })
  }

  //Create calendar event reminder for specified event
  setReminder = (id) => {
    this.state.events.forEach((event) => {

      if(event.id === id){
        
        var event_object = CreateEventObject(event)

        if(!Array.isArray(event_object)){
          event_object = [event_object]
        }

        event_object.forEach(event => {
          SendEventReq(LOCALHOST + endpoints.event_req, event).then((resp) => {
            console.log(resp)
          })
        });
      }
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
                <Events event_list={this.state.events} setReminder={this.setReminder}/> 
              </React.Fragment>
            )}/>

            {/* About Page */}
            <Route path="/About" render={() => (
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
