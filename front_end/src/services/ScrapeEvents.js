const axios = require('axios')

export default async function scrapeEvents(LOCALHOST){
    console.log("Scraping Events")

    try{
        const resp = await axios.get(LOCALHOST + "/events")
        return resp.data
    }
    catch(error){
        console.error("Scrape Request Error: ")
        return error
    }
  }