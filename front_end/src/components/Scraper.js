const request = require('request')
const Cheerio = require('cheerio')


function Scraper(){
    const events_array = []
    var event_id = 1
    
    request('https://www.timeanddate.com/astronomy/sights-to-see.html', (err, resp, html) =>{
        if(!err && resp.statusCode === 200){
            const $ = Cheerio.load(html)
                
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
    
        }
    })

    return events_array
}

export default Scraper;