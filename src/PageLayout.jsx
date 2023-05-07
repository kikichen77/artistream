import { NavLink, Outlet } from "react-router-dom"
import React from "react"

export default function PageLayout(){
    return(<React.Fragment>
        {/* <header>
        TobyZoom
        
        <NavLink
        to="/connect"
        className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? "active" : ""
        }>Connect</NavLink>
        </header> */}

        <div className = "container">
            <Outlet/>
        </div>
        </React.Fragment>)
}