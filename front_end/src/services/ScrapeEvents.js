const axios = require('axios')

export default async function scrapeEvents(url){
    console.log("Scraping Events")

    try{
        const resp = await axios.get(url)
        return resp.data
    }
    catch(error){
        console.log("Scrape Request Error: ")
        return error
    }
  }