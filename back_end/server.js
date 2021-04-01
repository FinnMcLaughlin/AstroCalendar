const request = require('request')
const Cheerio = require('cheerio')

const express = require('express')
const app = express()
const port = 5000

app.get("/", (req, res) => {
    res.send("Hello World")
})

function scrape(callback){
    request('http://quotes.toscrape.com/', (err, resp, html) =>{
        console.log("Status Code: " + resp.statusCode)
        if(!err && resp.statusCode === 200){
            const events_array = []
            var event_id = 1

            const $ = Cheerio.load(html)

            console.log("Loaded")
                
            $('.quote').each((index, event) => {
                const quote_text = $(event).find('.text').text()
                const quote_author = $(event).find('.author').text()

                events_array.push({
                    id: event_id,
                    author: quote_author,
                    quote: quote_text
                })

                event_id += 1
            })


            callback(events_array)
        }
    })
}

app.get("/events", (req, res) => {
    events_array = scrape((events_array) => {
        //res.send(events_array)
        res.send("Good Work")
        console.log("Response Sent")
    })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})