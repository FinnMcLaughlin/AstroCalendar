import React from "react";
import { render, cleanup, fireEvent, waitFor} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import axiosMock from "axios";
import Header from '../components/layout/Header.js'
import App from '../App.js'

afterEach(() => {
    cleanup()
})

describe("App Component", () => {
    
    test("renders header correcty", () => {
        const { getByTestId } = render(<BrowserRouter><Header /></BrowserRouter>)
    
        const header_obj = getByTestId("header-component")
    
        expect(header_obj).toMatchSnapshot()
    })
    
    test("renders 'About' page correctly", () => {
        const { getByTestId } = render(<App page="/About" />)
    
        const app_object = getByTestId("app-component")
    
        expect(app_object).toMatchSnapshot()
    })
    
    test("renders 'Home' page correctly", async () => {
        axiosMock.get.mockResolvedValueOnce({ data:
            [{      
                id: 1,
                event_name: "Cosmic Insanity",
                event_details: "Hell of a trip man",
                event_date: "April 1",
                reminder_set: true
            },
            {      
                id: 2,
                event_name: "Don't Look Up",
                event_details: "Please, don't do it",
                event_date: "April 2",
                reminder_set: false
            }]
        });
    
        const { getByTestId } = render(<App />)
    
        fireEvent.click(getByTestId('scrape-button'))
    
        const app_component_obj = await waitFor(() => getByTestId("app-component"))
    
        expect(app_component_obj).toMatchSnapshot()
        expect(axiosMock.get).toHaveBeenCalledTimes(1);
    })
})

