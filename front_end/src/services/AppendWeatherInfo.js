function AppendWeatherInfo(forecast_list, event_obj, event_date_full, event_date_shorthand) {
    // Get forecast object closest to the given event date & sunset time
    // Update event object with weather coniditions, cloud %, temp
    // Return event object

    const e_date = new Date(event_date_full)

    var closest_date_index

    for(var index = 0; index < forecast_list.length; index++){
        const f_date = new Date(forecast_list[index].dt_txt)
        const f_date_1 = new Date(forecast_list[index + 1].dt_txt)

        if(Math.abs(f_date - e_date) < Math.abs(f_date_1 - e_date)){
            closest_date_index = index
            break
        }
    }

    console.log(forecast_list[closest_date_index])

    if(event_obj.weather === undefined){
        event_obj = {
        ...event_obj,
        weather: [{
            forecast_date: event_date_shorthand,
            forecast: forecast_list[closest_date_index].weather[0].description,
            visibility: forecast_list[closest_date_index].clouds.all + "%",
            temp: forecast_list[closest_date_index].main.temp
        }]
        }
    }
    else{
        event_obj.weather.push({
        forecast_date: event_date_shorthand,
        forecast: forecast_list[closest_date_index].weather[0].description,
        visibility: forecast_list[closest_date_index].clouds.all + "%",
        temp: forecast_list[closest_date_index].main.temp
        })
    }   

    return event_obj
}

export default AppendWeatherInfo