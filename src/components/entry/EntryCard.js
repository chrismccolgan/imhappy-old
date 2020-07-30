import React from "react"
import "./EntryCard.css"

const EntryCard = props => {
    const d = new Date(props.entry.date)
    const month = d.toLocaleString("en-US", { month: "long" })
    const day = d.getDate()
    const year = d.getFullYear()
    const dateString = `${month} ${day}, ${year}`

    let classString = `card ${month}`
    if (props.entry.isSignificant) {
        classString += " significant"
    }

    return (
        <div className={classString}>
            <span className="card-icon">{props.entry.category.icon}</span>
            {" "}
            <span className="card-date">{dateString}:</span>
            {" "}
            <span className="card-entry">{props.entry.entry}</span>
            {" "}
            <span className="card-buttons">
                <span className="card-buttons-delete" onClick={() => props.deleteEntry(props.entry.id)}>Delete</span>
                {" "}
                <span className="card-buttons-edit" onClick={() => props.history.push(`/entries/${props.entry.id}/edit`)}>Edit</span>
            </span>
        </div>
    )
}

export default EntryCard