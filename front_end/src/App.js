import { BrowserRouter as Router, Route } from 'react-router-dom'
import React, { Component } from 'react'
import Header from './components/layout/Header.js'
import Events from './components/Events.js'
import About from './components/pages/About.js'
//import Scraper from './components/Scraper.js'
import './App.css'

//const request = require('request')
//const Cheerio = require('cheerio')
const axios = require('axios')

class App extends Component {
  state = {
    events: []
  }

  componentDidMount(){
    console.log("Fetching")


    axios("http://localhost:5000/events").then((response) =>{
      console.log(response.data);
    })

    /*fetch("http://localhost:5000/events", {
        mode: 'no-cors',
        method: 'GET',
        headers: {
        Accept: 'application/json',
      }
    }).then((response) =>{
      console.log(response);
    })*/
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
