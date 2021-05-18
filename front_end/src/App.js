import { BrowserRouter as Router, Route } from 'react-router-dom'
import React, { Component } from 'react'
import Header from './components/layout/Header.js'
import Events from './components/Events.js'
import About from './components/pages/About.js'
import SendEventReq from './services/SendEventReq.js'
import CreateEventObject from './services/CreateEventObj.js'
import ScrapeEvents from './services/ScrapeEvents.js'
import GetWeatherForecast from './services/GetWeatherForecast.js'
import EventDateRangeCheck from './services/EventDateRangeCheck.js'
import SplitMultipleDateEvents from './services/SplitMutipleDateEvents.js'
import AppendWeatherInfo from './services/AppendWeatherInfo.js'
import './App.css'

const LOCALHOST = 'http://localhost:5000'

const endpoints = {
  scrape_events: "/events",
  event_req: "/reminder",
  weather: "/weather"
}

class App extends Component {
  state = {
    events: [],
    forecast: []
  }

  componentDidMount(){
    console.log("Component Mounted")
    
    GetWeatherForecast(LOCALHOST + endpoints.weather).then((weather_data) => {
      console.log(weather_data)

      this.setState({forecast: weather_data})

      this.testWeatherEvent()
    })
  }


  // Function to test weather forecast information when none is currently available
  testWeatherEvent = () => {
    // Create fake event object
    var test_event = {
      event_date: "May 19/20",
      event_details: "This moon was created solely for testing purposes and is privately owned by the McLaughlin corporation",
      event_name: "Mega Moon",
      id: 1,
      reminder_set: false
    }

    // Update event object with weather info
    const forecast_list = this.state.forecast.list
    
    var sunset = new Date(this.state.forecast.city.sunset * 1000)
    var event_date = test_event.event_date

    if(test_event.event_date.includes("/")){
      const split_events = SplitMultipleDateEvents(event_date)

      split_events.forEach(_event => {
        const event_date_string_full = _event + " 2021 " + sunset.getHours() + ":" + sunset.getMinutes()

        if(EventDateRangeCheck(event_date_string_full)){
          test_event = AppendWeatherInfo(forecast_list, test_event, event_date_string_full, _event)
        }
      });

    }
    else{
      const event_date_string_full = event_date + " 2021 " + sunset.getHours() + ":" + sunset.getMinutes()

      if(EventDateRangeCheck(event_date_string_full)){
        test_event = AppendWeatherInfo(forecast_list, test_event, event_date_string_full, event_date)
      }
    }
    
    // Store in state.events
    this.setState({events: [test_event]})

    console.log(this.state)
  } 

  // Function to request the backend server to scrape the events from the given url 
  scrapeEvents = () => {
    ScrapeEvents(LOCALHOST + endpoints.scrape_events).then((events_data) => {
      console.log(events_data)

      var sunset = new Date(this.state.forecast.city.sunset * 1000)

      var event_index = 0

      for(let event of events_data){
        var event_date_string = event.event_date

        // console.log("Checking Event: " + event_date_string)

        if(event_date_string.includes("/")){
          const split_events = SplitMultipleDateEvents(event_date_string)
          event_date_string = split_events[0]

          // console.log(event_date_string)
        }

        const event_date_string_full = event_date_string + " 2021 " + sunset.getHours() + ":" + sunset.getMinutes()
        var within_range = EventDateRangeCheck(event_date_string_full)
        
        // console.log(within_range)
        
        if(within_range){
          console.log("Event: " + event_date_string)
          events_data[event_index] = AppendWeatherInfo(this.state.forecast.list, event, event_date_string_full, event_date_string)
        }
        else if(within_range === null){
          console.log("Event Passed")
        }
        else{
          break
        }

        event_index += 1
      }

      //const event_date_string = events_data[1].event_date + " 2021 " + sunset.getHours() + ":" + sunset.getMinutes()

      /*const event_date_string = "May 14 2021 " + sunset.getHours() + ":" + sunset.getMinutes()

      var within_range = EventDateRangeCheck(event_date_string)

      console.log("-------> " + within_range)

      events_data[1] = AppendWeatherInfo(events_data[1])*/
      
      this.setState({events: events_data})

      console.log(this.state)
    })
  }

  //Create calendar event reminder for specified event
  setReminder = (id) => {
    // TODO: Ineffecient foreach loop
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
        <div data-testid="app-component" className="App">
          <div className="container">
            
            {/* Home Page */}
            <Route exact path="/" render={props => (
              <React.Fragment>
                <Header />
                {/* Temporary Web Scrape Button */}
                <button data-testid="scrape-button" onClick={this.scrapeEvents}>Get Events</button>
                <div data-testid="events-list">
                  <Events event_list={this.state.events} setReminder={this.setReminder}/> 
                </div>
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
