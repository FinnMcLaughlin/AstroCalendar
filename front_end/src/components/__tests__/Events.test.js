import '@testing-library/jest-dom';
import { render, cleanup } from '@testing-library/react'
import Events from '../Events'

afterEach(() => {
    cleanup()
})

const test_events_array = [
    {
        id: 1,
        event_name: "St. Patricks Day",
        event_date: "17/03/2021",
        reminder_set: true
    },
    {
        id: 2,
        event_name: "Halloween",
        event_date: "31/10/2021",
        reminder_set: false
    }
]

function setReminder(event_id){
    console.log("Reminder set for event: ", event_id)
}

test("renders all events correctly", () => {
    const { getAllByTestId } = render(<Events event_list={test_events_array} setReminder={setReminder}/>)

    const all_events = getAllByTestId("event-obj-div")

    expect(all_events[0].textContent).toContain("St. Patricks Day")
    expect(all_events[1].textContent).toContain("Halloween")

    expect(all_events).toMatchSnapshot()
})