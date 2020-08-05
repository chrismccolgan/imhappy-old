import React from "react"
import "./EntryCard.css"

const EntryCard = props => {
    let d = new Date(props.entry.date)
    const m = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const month = m[d.getUTCMonth()]
    const day = d.getUTCDate()
    const year = d.getUTCFullYear()
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
            <div className="card-buttons">
                <i className="material-icons card-buttons-delete" onClick={() => props.deleteEntry(props.entry.id)}>delete</i>
                <i className="material-icons card-buttons-edit" onClick={() => props.history.push(`/entries/${props.entry.id}/edit`)}>edit</i>
            </div>
        </div>
    )
}

export default EntryCard