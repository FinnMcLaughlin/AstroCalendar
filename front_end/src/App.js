import { BrowserRouter as Router, Route } from 'react-router-dom'
import React, { Component } from 'react'
import Header from './components/layout/Header.js'
import Events from './components/Events.js'
import About from './components/pages/About.js'
import './App.css'

const axios = require('axios')

const LOCALHOST = 'http://localhost:5000'

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
    axios.get(LOCALHOST + '/events')
    .then((resp) => {
      if(resp.status === 200){
        console.log(resp)
        this.setState({events: resp.data})
      }
    })
    .catch((err) => {
      console.error("Scrape Request Error: " + err)
    })
  }

  // Function to create event object based on given event details
  create_event_object = (event) => {

    // If event takes place over multiple dates
    if(event.event_date.includes("/")){

      var event_1 = Object.assign({}, event)
      var event_2 = Object.assign({}, event)

      event_1.event_date = event.event_date.split("/")[0]
      event_2.event_date = event.event_date.split(" ")[0] + " " + event.event_date.split("/")[1]
      
      return [this.create_event_object(event_1), this.create_event_object(event_2)]
    }

    const start_time = new Date(event.event_date + " 2021")
    start_time.setHours(19)

    const end_time = new Date(event.event_date + " 2021")
    end_time.setHours(start_time.getHours() + 10)

    return {
      summary: event.event_name,
      description: event.event_details,
      start: {
        dateTime: start_time,
        timezone: 'Europe/Berlin',
      },
      end: {
        dateTime: end_time,
        timezone: 'Europe/Berlin',
      },
      reminders: {
        useDefault: false,
        overrides: [
          {
            method: "popup",
            minutes: 1440 
          },
          {
            method: "popup",
            minutes: 60 
          }
        ]
      }
    }
  }

  // Function to send reminder creation request to the backend server
  send_event_request = (event_req) => {
    axios.post(LOCALHOST + '/reminder', event_req).then((resp) => {
      if(resp.status === 200){
        return console.log(resp)
      }
    }).catch((err) => {
      return console.error("Error: ", err)
    })
  }

  //Create calendar event reminder for specified event
  setReminder = (id) => {
    this.state.events.forEach((event) => {

      if(event.id === id){
        
        var event_object = this.create_event_object(event)

        if(!Array.isArray(event_object)){
          event_object = [event_object]
        }

        event_object.forEach(event => {
          this.send_event_request(event)
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
