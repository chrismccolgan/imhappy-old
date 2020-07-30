import React, { useState, useEffect } from "react"
import EntryCard from "./EntryCard"
import APIManager from "../../modules/APIManager"

const EntryList = props => {
    const [entries, setEntries] = useState([])

    const getEntries = () => {
        return APIManager.getAllEntries().then(entriesFromAPI => {
            setEntries(entriesFromAPI)
        })
    }

    useEffect(() => {
        getEntries()
    }, [])

    const deleteEntry = id => {
        APIManager.deleteAnEntry(id)
            .then(() => APIManager.getAllEntries().then(setEntries))
    }

    return (
        <div className="container-cards">
            {entries.map(entry =>
                <EntryCard
                    key={entry.id}
                    entry={entry}
                    deleteEntry={deleteEntry}
                    {...props}
                />
            )}
        </div>
    )
}

export default EntryList