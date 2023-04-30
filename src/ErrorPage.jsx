import React from "react"
import { useLocation } from 'react-router-dom';
export default function ErrorPage() {
    let location = useLocation();
    return (<React.Fragment>
            <h1>Error Page</h1>
            <p>You did something wrong.</p>
            </React.Fragment>)
}