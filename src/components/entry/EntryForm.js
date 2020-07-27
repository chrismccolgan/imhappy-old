import React, { useState } from 'react';
import APIManager from '../../modules/APIManager';
import './EntryForm.css';

const EntryForm = props => {
    const [entry, setEntry] = useState({ entry: "", date: "", userId: 0, categoryId: 0, isSignificant: false})
    const [isLoading, setIsLoading] = useState(false);


    const handleFieldChange = evt => {
        const stateToChange = { ...entry };
        stateToChange[evt.target.id] = evt.target.value;
        setEntry(stateToChange);
    };

    const constructNewEntry = evt => {
        evt.preventDefault();
        if (entry.name === "" || entry.date === "" 
        // || entry.categoryId === 0
        ) {
            window.alert("Please complete all fields");
        } else {
            setIsLoading(true);
            APIManager.saveEntry(entry)
                .then(() => props.history.push("/"));
        }
    };

    entry.categoryId = 1
    entry.userId = 1

    return (
        <React.Fragment>
            <form>
                <fieldset>
                    <div className="formgrid">
                        <input
                            type="hidden"
                            required
                            className="form"
                            onChange={handleFieldChange}
                            id="userId"
                            value={entry.userId}
                        />

                        <input
                            type="text"
                            required
                            className="form"
                            onChange={handleFieldChange}
                            id="entry"
                            value={entry.entry}
                        />
                        <label htmlFor="name">Entry</label>

                        <input
                            type="date"
                            required
                            className="form"
                            onChange={handleFieldChange}
                            id="date"
                            value={entry.date}
                        />
                        <label htmlFor="date">Date</label>

                        <input
                            type="text"
                            required
                            className="form"
                            onChange={handleFieldChange}
                            id="categoryId"
                            value={entry.categoryId}
                        />
                        <label htmlFor="categoryId">Category</label>
                    </div>

                        <button
                            type="button"
                            disabled={isLoading}
                            onClick={constructNewEntry}
                        >Submit</button>

                </fieldset>
            </form>
        </React.Fragment>
    )
}

export default EntryForm