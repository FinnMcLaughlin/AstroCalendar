import '@testing-library/jest-dom';
import { render, cleanup, fireEvent} from '@testing-library/react'
import EventObject from '../EventObject'

afterEach(() => {
    cleanup()
})

// Reminder Button Label
const reminder_button_label = "Create Reminder"

// Mock event object to be passed to /EventObject
const test_event_obj = {
    id: 1,
    event_name: "St. Patricks Day",
    event_date: "17/03/2021",
    reminder_set: true
}

// Event Reminder array to test the correct ID was returned from /EventObject
const test_event_reminders = []

// Mock function to populate test_event_reminder array with the event object id when button clicked
function setReminder(event_id){
    console.log("Reminder set for event: ", event_id)
    test_event_reminders.push(event_id)
}

test("renders event object", () => {

    const { getByTestId } = render(<EventObject event_info={test_event_obj} setReminder={setReminder}/>)

    const event_div = getByTestId("event-obj-div")
    
    expect(event_div).toMatchSnapshot()
})

test("button sets reminder for correct event", () => {

    const { getByText } = render(<EventObject event_info={test_event_obj} setReminder={setReminder}/>)

    expect(test_event_reminders.length).toEqual(0)

    fireEvent.click(getByText(reminder_button_label))

    expect(test_event_reminders.length).toEqual(1)
    expect(test_event_reminders).toContain(1)
})