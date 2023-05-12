import React from "react"
import { useLocation } from 'react-router-dom';
import { NavLink } from "react-router-dom"
import styles from "./Components/MiscComponentStyles.module.css"

// Error page layout
export default function ErrorPage() {
    let location = useLocation();
    return (<div className={styles.errorPage}>
            <h1>Oops!</h1>
            <p>An error occurred. Please go back to the 
                <NavLink
                    className={styles.errorPageLink}
                    to="/connect"
                > landing page.</NavLink>
            </p>
            
            </div>)
}