function SplitMultipleDateEvents(event_date_string) {
    var event_1 = event_date_string.split("/")[0]
    var event_2 = event_date_string.split(" ")[0] + " " + event_date_string.split("/")[1]
    
    return [event_1, event_2]
}

export default SplitMultipleDateEvents