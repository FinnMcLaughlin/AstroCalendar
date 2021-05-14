import { BrowserRouter as Router, Route } from 'react-router-dom'
import React, { Component } from 'react'
import Header from './components/layout/Header.js'
import Events from './components/Events.js'
import About from './components/pages/About.js'
import SendEventReq from './services/SendEventReq.js'
import CreateEventObject from './services/CreateEventObj.js'
import ScrapeEvents from './services/ScrapeEvents.js'
import GetWeatherForecast from './services/GetWeatherForecast.js'
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
      
      //var sunset = new Date(weather_data.city.sunset * 1000)

      //const event_date_string = "May 15 2021 " + sunset.getHours() + ":" + sunset.getMinutes()

      //console.log(this.checkEventDate(event_date_string))

      this.setState({forecast: weather_data})
    })

    //this.scrapeEvents()
  }


  // Function to check if a given event is within the forecast availability
  checkEventDate = (event_date_string) => {
    const today = new Date()
    
    const forecast_availability_date = new Date(today)
    forecast_availability_date.setDate(today.getDate() + 5)
    
    const event_date = new Date(event_date_string)

    if(event_date < today){
      return null
    }

    return (today < event_date && event_date < forecast_availability_date) ? true : false
  }

  splitMultipleDateEvents = (event_date_string) => {
      var event_1 = event_date_string.split("/")[0]
      var event_2 = event_date_string.split(" ")[0] + " " + event_date_string.split("/")[1]
      
      return [event_1, event_2]
  }

  appendWeatherInfo = (event_obj, event_date) => {
    // Get forecast object closest to the given event date & sunset time
    // Update event object with weather coniditions, cloud %, temp
    // Return event object

    const e_date = new Date(event_date)
    
    const forecast_list = this.state.forecast.list
    var closest_date_index

    for(var index = 0; index < forecast_list.length; index++){
       const f_date = new Date(this.state.forecast.list[index].dt_txt)
       const f_date_1 = new Date(this.state.forecast.list[index + 1].dt_txt)

       if(Math.abs(f_date - e_date) < Math.abs(f_date_1 - e_date)){
         closest_date_index = index
         break
       }
    }

    console.log(forecast_list[closest_date_index])

    event_obj = {
      ...event_obj,
      weather: forecast_list[closest_date_index].weather[0].description,
      visibility: forecast_list[closest_date_index].clouds.all + "%",
      temp: forecast_list[closest_date_index].main.temp
    }

    return event_obj
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
          const split_events = this.splitMultipleDateEvents(event_date_string)
          event_date_string = split_events[0]

          // console.log(event_date_string)
        }

        const event_date_string_full = event_date_string + " 2021 " + sunset.getHours() + ":" + sunset.getMinutes()
        var within_range = this.checkEventDate(event_date_string_full)
        
        // console.log(within_range)
        
        if(within_range){
          console.log("Event: " + event_date_string)
          events_data[event_index] = this.appendWeatherInfo(event, event_date_string_full)
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

      var within_range = this.checkEventDate(event_date_string)

      console.log("-------> " + within_range)

      events_data[1] = this.appendWeatherInfo(events_data[1])*/
      
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
