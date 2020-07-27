import React from "react";
import "./EntryCard.css"


const EntryCard = props => {
    const d = new Date(props.entry.date)
    const month = d.toLocaleString('en-US', { month: 'long' })
    const day = d.getDate()
    const year = d.getFullYear()
    const dateString = `${month} ${day}, ${year}`
    
    let className = `card ${month}`
    if (props.entry.isSignificant) {
      className += ' significant';
    }

    return (
        <div className={className}>{props.entry.category.icon} <span className="card-date">{dateString}:</span> {props.entry.entry} <span className="card-buttons"><span className="card-buttons-delete" onClick={() => props.deleteEntry(props.entry.id)}>Delete</span></span></div>
    );
};

export default EntryCard;

// const m = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
// const month = m[d.getMonth()]; 