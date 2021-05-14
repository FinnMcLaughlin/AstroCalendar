import axios from "axios";

export default async function GetWeatherForecast(url){
    console.log("Getting Weather")

    const request_body = {
        city: "Berlin,de"
    }

    try{
        const resp = await axios.post(url, request_body)
        return resp.data
    }
    catch(error){
        console.log("Weather Request Error: " + error)
        return error
    }
  }