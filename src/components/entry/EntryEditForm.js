import React, { useState, useEffect } from "react"
import APIManager from "../../modules/APIManager"
import "./EntryForm.css"

const EntryEditForm = props => {
    const [entry, setEntry] = useState({ entry: "", date: "", userId: 0, categoryId: 0, isSignificant: false })
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getCategories = () => {
        return APIManager.getAllCategories()
            .then(categoriesFromAPI => {
                setCategories(categoriesFromAPI)
            })
    }

    useEffect(() => {
        APIManager.getSingleEntry(props.match.params.entryId)
            .then(entry => {
                setEntry(entry)
                setIsLoading(false)
            })
    }, [props.match.params.entryId])

    useEffect(() => {
        getCategories()
    }, [])

    const handleFieldChange = evt => {
        const stateToChange = { ...entry }
        stateToChange[evt.target.id] = evt.target.value
        setEntry(stateToChange)
    }

    const updateExistingEntry = evt => {
        evt.preventDefault()
        setIsLoading(true)
        entry.categoryId = parseInt(entry.categoryId)
        entry.isSignificant = JSON.parse(entry.isSignificant)
        const editedEntry = {
            id: props.match.params.entryId,
            entry: entry.entry,
            date: entry.date,
            categoryId: entry.categoryId,
            isSignificant: entry.isSignificant,
            userId: entry.userId
        }
        APIManager.editEntry(editedEntry)
            .then(() => props.history.push("/"))
    }

    // const deleteEntry = () => {
    //     APIManager.deleteAnEntry(props.match.params.entryId)
    //         .then(() => props.history.push("/"))
    // }

    return (
        <div className="container-form">
            <form onSubmit={updateExistingEntry}>
                <fieldset>
                    <input
                        className="form"
                        id="userId"
                        onChange={handleFieldChange}
                        required
                        type="hidden"
                        value={entry.userId}
                    />

                    <label htmlFor="categoryId">Category</label>
                    <br />
                    <select
                        className="form"
                        id="categoryId"
                        onChange={handleFieldChange}
                        required
                        value={entry.categoryId}
                    >
                        <option value="">Category</option>
                        {categories.map(category =>
                            <option key={category.id} value={category.id}>{category.icon} {category.category}</option>
                        )}
                    </select>
                    <br />

                    <label htmlFor="date">Date</label>
                    <br />
                    <input
                        className="form"
                        id="date"
                        onChange={handleFieldChange}
                        required
                        type="date"
                        value={entry.date}
                    />
                    <br />

                    <label htmlFor="name">Entry</label>
                    <br />
                    <input
                        className="form"
                        id="entry"
                        onChange={handleFieldChange}
                        required
                        type="text"
                        value={entry.entry}
                    />
                    <br />

                    <label htmlFor="isSignificant">Significant</label>
                    <br />
                    <select
                        className="form"
                        id="isSignificant"
                        onChange={handleFieldChange}
                        value={entry.isSignificant}
                    >
                        <option value="false">False</option>
                        <option value="true">True</option>
                    </select>
                    <br />

                    <button disabled={isLoading} type="submit">Submit</button>
                    {/* <button disabled={isLoading} onClick={deleteEntry} type="button">Delete</button> */}
                </fieldset>
            </form>
        </div>
    )
}

export default EntryEditForm