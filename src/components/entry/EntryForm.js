import React, { useState, useEffect } from "react"
import APIManager from "../../modules/APIManager"
import "./EntryForm.css"

const EntryForm = props => {
    const [entry, setEntry] = useState({ entry: "", date: "", userId: 0, categoryId: 0, isSignificant: false })
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getCategories = () => {
        return APIManager.getAllCategories().then(categoriesFromAPI => {
            setCategories(categoriesFromAPI)
        })
    }

    useEffect(() => {
        getCategories()
    }, [])

    const handleFieldChange = evt => {
        const stateToChange = { ...entry }
        stateToChange[evt.target.id] = evt.target.value
        setEntry(stateToChange)
    }

    const constructNewEntry = evt => {
        evt.preventDefault()
        setIsLoading(true)
        entry.isSignificant = JSON.parse(entry.isSignificant)
        entry.categoryId = parseInt(entry.categoryId)
        APIManager.saveEntry(entry)
            .then(() => props.history.push("/"))
    }

    entry.userId = 1

    return (
        <div className="container-form">
            <form onSubmit={constructNewEntry}>
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

                    <label htmlFor="entry">Entry</label>
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

                    <button disabled={isLoading} type="submit">Save entry</button>
                </fieldset>
            </form>
        </div>
    )
}

export default EntryForm