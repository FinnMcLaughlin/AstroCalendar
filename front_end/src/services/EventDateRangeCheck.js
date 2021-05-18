// Function to check if a given event is within the forecast availability
function eventDateRangeCheck(event_date_string) {
    const today = new Date()
    
    const forecast_availability_date = new Date(today)
    forecast_availability_date.setDate(today.getDate() + 5)
    
    const event_date = new Date(event_date_string)

    if(event_date < today){
        return null
    }

    return (today < event_date && event_date < forecast_availability_date) ? true : false
}

export default eventDateRangeCheck;
