function CreateEventObject(event_info){
    if(event_info.weather === undefined){
        // If event takes place over multiple dates
        if(event_info.event_date.includes("/")){

            var event_1 = Object.assign({}, event_info)
            var event_2 = Object.assign({}, event_info)

            event_1.event_date = event_info.event_date.split("/")[0]
            event_2.event_date = event_info.event_date.split(" ")[0] + " " + event_info.event_date.split("/")[1]
            
            return [CreateEventObject(event_1), CreateEventObject(event_2)]
        }

        const start_time = new Date(event_info.event_date + " 2021")
        start_time.setHours(19)

        const end_time = new Date(event_info.event_date + " 2021")
        end_time.setHours(start_time.getHours() + 10)

        return {
            summary: event_info.event_name,
            description: event_info.event_details,
            start: {
            dateTime: start_time,
            timezone: 'Europe/Berlin',
            },
            end: {
            dateTime: end_time,
            timezone: 'Europe/Berlin',
            },
            reminders: {
            useDefault: false,
            overrides: [
                {
                method: "popup",
                minutes: 1440 
                },
                {
                method: "popup",
                minutes: 60 
                }
            ]
            }
        }
    }

    else{
        const event_object_array = []

        for(var weather_index=0; weather_index < event_info.weather.length; weather_index++){
            const weather_info = event_info.weather[weather_index]
    
            const start_time = new Date(weather_info.forecast_date_full)
    
            console.log("ST: " + start_time)
    
            const end_time = new Date(weather_info.forecast_date_full)
    
            end_time.setHours(start_time.getHours() + 5)
    
            const event_desc = "Description: " + event_info.event_details + 
            "\n\nForecast: " + weather_info.forecast +
            "\nVisibility: " + weather_info.visibility +
            "\nTemp: " + weather_info.temp + `\u{00B0}C`
    
            event_object_array.push({
                summary: event_info.event_name,
                description: event_desc,
                start: {
                    dateTime: start_time,
                    timezone: 'Europe/Berlin',
                },
                end: {
                    dateTime: end_time,
                    timezone: 'Europe/Berlin',
                },
                reminders: {
                    useDefault: false,
                    overrides: [
                        {
                        method: "popup",
                        minutes: 1440 
                        },
                        {
                        method: "popup",
                        minutes: 60 
                        }
                    ]
                }
            })
        }
    
        return event_object_array
    }    
}

export default CreateEventObject;