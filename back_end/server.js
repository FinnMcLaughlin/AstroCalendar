const request = require('request')
const Cheerio = require('cheerio')

const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000

app.use(cors())

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

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})