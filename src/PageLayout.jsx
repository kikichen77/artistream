import { Outlet } from "react-router-dom"
import React from "react"

export default function PageLayout(){
    return(<React.Fragment>
        <div className = "container">
            <Outlet/>
        </div>
        </React.Fragment>)
}