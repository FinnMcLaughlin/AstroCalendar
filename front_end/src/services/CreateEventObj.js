function CreateEventObject(event_info){
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

export default CreateEventObject;