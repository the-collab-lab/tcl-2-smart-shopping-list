import React from "react"
import { Link } from 'react-router-dom'

// This Navbar allows users to navigate from the List view to the Add Item view
// It is used in the FetchItems.js component and the AddItem.js component

function Navbar() {
    return (
        <React.Fragment>
            <div className="Navbar">
                <Link className="NavItem" to="/list">List</Link>
                <Link className="NavItem" to="/add">Add</Link>
            </div>
        </React.Fragment >
    )
}

export default Navbar 