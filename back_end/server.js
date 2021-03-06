const request = require('request')
const Cheerio = require('cheerio')

const { google } = require('googleapis')
const { OAuth2 }  = google.auth
const OAuth2Client = new OAuth2(
    '<CLIENT ID>',
    '<SECRET ID>'
    )

const calendar = google.calendar({
    version: 'v3',
    auth: OAuth2Client
})

OAuth2Client.setCredentials({
    access_token: '<ACCESS TOKEN>',
    refresh_token: '<REFRESH TOKEN>'
})

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 5000

app.use(cors())
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("Hello There")
})

// Function to pull astronomy events, dates and their details from the given url and storing them in an array of event objects
function scrape(callback){
    request('https://www.timeanddate.com/astronomy/sights-to-see.html', (err, resp, html) =>{
        if(!err && resp.statusCode === 200){
            console.log("Status Code: " + resp.statusCode)

            const events_array = []
            var event_id = 1

            const $ = Cheerio.load(html)

            console.log("Loaded")
                
            $('.post-row').each((index, event) =>{
                const event_info = $(event).find('h3').text().split(": ")
                $('large-link').remove()
                const event_details = $(event).find('p').first().text()
    
                events_array.push({
                    id: event_id,
                    event_date: event_info[0],
                    event_name: event_info[1],
                    event_details: event_details,
                    reminder_set: false
                })
    
                event_id += 1
            })

            callback(events_array)
        }
    })
}

// Carries out get requests, returning an array of event objects, populated by the contents of a given url
app.get("/events", (req, res) => {
    events_array = scrape((events_array) => {
        res.send(events_array)
        //console.log(events_array)
        console.log("Response Sent")
    })
})

// Creates a google calendar event based on the given hard-coded details
app.post("/reminder", (req, res) => {

    const event_object = req.body
    const event_start_time = event_object.start.dateTime
    const event_end_time = event_object.end.dateTime

    
    // Checks for bookings made at this time to prevent double booking
    calendar.freebusy.query({resource: {
        timeMin: event_start_time,
        timeMax: event_end_time,
        timezone: 'Europe/Berlin',
        items: [{id: 'primary'}]
    }}, (err, resp) => {
        if(err) return console.error("Freebusy error: ", err)

        const eventsArr = resp.data.calendars.primary.busy

        if(eventsArr.length === 0) return calendar.events.insert({
            calendarId: 'primary',
            resource: event_object
        }, (err) => {
            if (err) return console.error("Calendar event creation error: ", err)

            console.log("Calendar event created!")

            return res.send("Calendar event created for: " + event_object.summary +
            " at: " + event_start_time.split("T")[0] + " " + event_start_time.split("T")[1]) 
        })

        console.log("Calendar Event Busy for that date / time")

        return res.send("Calendar Event Busy for that date / time")
    })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})