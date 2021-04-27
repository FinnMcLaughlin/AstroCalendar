import axios from "axios";

export default async function ScrapeEvents(url){
    console.log("Scraping Events")

    try{
        const resp = await axios.get(url)
        return resp.data
    }
    catch(error){
        console.log("Scrape Request Error: " + error)
        return error
    }
  }