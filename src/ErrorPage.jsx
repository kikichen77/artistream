import React from "react"
import { useLocation } from 'react-router-dom';
import { NavLink } from "react-router-dom"

export default function ErrorPage() {
    let location = useLocation();
    return (<React.Fragment>
            <h1>Oops!</h1>
            <p>An error occurred. Please go back to the 
                <NavLink
                to="/connect"
                > Landing Page</NavLink>
            </p>
            
            </React.Fragment>)
}