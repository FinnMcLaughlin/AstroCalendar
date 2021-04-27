import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react'
import CreateEventObj from './../CreateEventObj.js'

afterEach(() => {
    cleanup()
})

describe('Create Event Object service', () => {
    test("successfully creates single date event object", () => {
        const test_event = {
            id: 1,
            event_name: "Cosmic Insanity",
            event_details: "Hell of a trip man",
            event_date: "April 1",
            reminder_set: true
        }
    
        const test_event_object = CreateEventObj(test_event)
    
        expect(typeof(test_event_object)).toBe('object')
    
        expect(test_event_object.summary).toEqual("Cosmic Insanity")
        expect(test_event_object.description).toEqual("Hell of a trip man")
    
        expect(test_event_object.start.dateTime).toEqual(new Date("2021-04-01T17:00:00.000Z"))
        expect(test_event_object.start.timezone).toEqual("Europe/Berlin")
    
        expect(test_event_object.end.dateTime).toEqual(new Date("2021-04-02T03:00:00.000Z"))
        expect(test_event_object.end.timezone).toEqual("Europe/Berlin")
    
        expect(test_event_object.reminders.useDefault).toEqual(false)
        expect(test_event_object.reminders.overrides).toHaveLength(2)
        expect(test_event_object.reminders.overrides[0].method).toEqual("popup")
        expect(test_event_object.reminders.overrides[0].minutes).toEqual(1440)
        expect(test_event_object.reminders.overrides[1].method).toEqual("popup")
        expect(test_event_object.reminders.overrides[1].minutes).toEqual(60)
    })
    
    test("successfully creates multiple date event object", () => {
        const test_event = {
            id: 1,
            event_name: "Cosmic Insanity",
            event_details: "Hell of a trip man",
            event_date: "April 1/2",
            reminder_set: true
        }
    
        const test_event_object = CreateEventObj(test_event)
    
        expect(Array.isArray(test_event_object)).toBe(true)
    
        // First Event Tests
        expect(test_event_object[0].summary).toEqual("Cosmic Insanity")
        expect(test_event_object[0].description).toEqual("Hell of a trip man")
    
        expect(test_event_object[0].start.dateTime).toEqual(new Date("2021-04-01T17:00:00.000Z"))
        expect(test_event_object[0].start.timezone).toEqual("Europe/Berlin")
    
        expect(test_event_object[0].end.dateTime).toEqual(new Date("2021-04-02T03:00:00.000Z"))
        expect(test_event_object[0].end.timezone).toEqual("Europe/Berlin")
    
        expect(test_event_object[0].reminders.useDefault).toEqual(false)
        expect(test_event_object[0].reminders.overrides).toHaveLength(2)
        expect(test_event_object[0].reminders.overrides[0].method).toEqual("popup")
        expect(test_event_object[0].reminders.overrides[0].minutes).toEqual(1440)
        expect(test_event_object[0].reminders.overrides[1].method).toEqual("popup")
        expect(test_event_object[0].reminders.overrides[1].minutes).toEqual(60)
    
        // Second Event Tests
        expect(test_event_object[1].summary).toEqual("Cosmic Insanity")
        expect(test_event_object[1].description).toEqual("Hell of a trip man")
    
        expect(test_event_object[1].start.dateTime).toEqual(new Date("2021-04-02T17:00:00.000Z"))
        expect(test_event_object[1].start.timezone).toEqual("Europe/Berlin")
    
        expect(test_event_object[1].end.dateTime).toEqual(new Date("2021-04-03T03:00:00.000Z"))
        expect(test_event_object[1].end.timezone).toEqual("Europe/Berlin")
    
        expect(test_event_object[1].reminders.useDefault).toEqual(false)
        expect(test_event_object[1].reminders.overrides).toHaveLength(2)
        expect(test_event_object[1].reminders.overrides[0].method).toEqual("popup")
        expect(test_event_object[1].reminders.overrides[0].minutes).toEqual(1440)
        expect(test_event_object[1].reminders.overrides[1].method).toEqual("popup")
        expect(test_event_object[1].reminders.overrides[1].minutes).toEqual(60)
           
    })
})