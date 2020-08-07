import React, { useState, useEffect } from "react"
import APIManager from "../../modules/APIManager"
import "./EntryForm.css"

const EntryEditForm = props => {
    const [entry, setEntry] = useState({ entry: "", date: "", userId: 0, categoryId: 0, isSignificant: false })
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [tags, setTags] = useState([])
    const [newTags, setNewTags] = useState([])
    const [allTags, setAllTags] = useState([])

    const addTags = event => {
        if (event.keyCode === 32 && event.target.value !== "") {
            let x = event.target.value
            let tagTest = false
            x = x.slice(0, -1)
            let tagObj = {
                tag: x
            }

            allTags.find(tag => {
                if (tagObj.tag === tag.tag) {
                    tagObj.id = tag.id
                    setTags([...tags, tagObj])
                    setNewTags([...newTags, tagObj])
                    return tagTest = true
                }
            })

            if (tagTest === false) {
                APIManager.saveTags(tagObj)
                    .then(tag => {
                        setTags([...tags, tag])
                        setAllTags([...allTags, tag])
                        setNewTags([...newTags, tag])
                    })
            }
            event.target.value = ""
        }
    }

    const removeTags = index => {
        setTags([...tags.filter(tag => tags.indexOf(tag) !== index)])
    }

    const getAllTags = () => {
        return APIManager.getAllTags().then(tagsFromAPI => {
            setAllTags(tagsFromAPI)
        })
    }

    useEffect(() => {
        getAllTags()
    }, [])

    const getTags = () => {
        let tagArray = []
        return APIManager.getAllEntryTags(props.match.params.entryId)
            .then(entryTags => {
                entryTags.forEach(tag => {
                    tagArray.push(tag.tag)
                })
                setTags(tagArray)
            })
    }

    useEffect(() => {
        getTags()
    }, [])

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
        newTags.forEach(tag => {
            let entryTagObj = {
                tagId: tag.id,
                entryId: parseInt(props.match.params.entryId)
            }
            APIManager.saveEntryTag(entryTagObj)
        })
        APIManager.editEntry(editedEntry)
            .then(() => props.history.push("/"))
    }

    return (
        <div className="container-form">
            <form onSubmit={updateExistingEntry}>
                <fieldset>
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

                    <span>Tags</span>
                    <br />
                    <div className="tags-input">
                        <input
                            className="mainInput form"
                            type="text"
                            onKeyUp={event => addTags(event)}
                            placeholder=""
                        />
                        <ul>
                            {tags.map((tag, index) => (
                                <li className="li-tag" key={index}>
                                    <span className="tag">{tag.tag}</span>
                                    {" "}
                                    <span className="close" onClick={() => removeTags(index)}>x</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button disabled={isLoading} type="submit">Save entry</button>
                </fieldset>
            </form>
        </div>
    )
}

export default EntryEditForm