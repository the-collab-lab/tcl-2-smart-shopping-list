import React from "react"
import { Link } from 'react-router-dom'

// This Navbar allows users to navigate from the List view to the Add Item view
// It is used in the FetchItems.js component and the AddItem.js component

function BackButton() {
    return (
            <div className="BackButton" data-cy="Back">
                <Link className="BackButton_List" to="/list">&#9756;</Link>
            </div>
    )
}

export default BackButton 