const url = "http://localhost:5002"

export default {
    getAllEntries: () => {
        return fetch(`${url}/entries?_expand=category`)
            .then(response => response.json())
            .then(array => array.sort((a, b) => {
                return new Date(b.date) - new Date(a.date)
            }))
    },
    getEntriesByUser: (id) => {
        return fetch(`${url}/entries/?userId=${id}&_expand=category`)
            .then(response => response.json())
            .then(array => array.sort((a, b) => {
                return new Date(b.date) - new Date(a.date)
            }))
    },
    getSingleEntry: (id) => {
        return fetch(`${url}/entries/${id}?_expand=category&_embed=entryTags`)
            .then(response => response.json())
    },
    saveEntry: (newEntry) => {
        return fetch(`${url}/entries`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEntry)
        }).then(response => response.json())
    },
    deleteAnEntry: (id) => {
        return fetch(`${url}/entries/${id}`, {
            method: "DELETE",
        }).then(response => response.json())
    },
    editEntry: (editedEntry) => {
        return fetch(`${url}/entries/${editedEntry.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedEntry)
        }).then(response => response.json())
    },
    getAllUsers: () => {
        return fetch(`${url}/users`)
            .then(response => response.json())
    },
    getSingleUser: (id) => {
        return fetch(`${url}/users/${id}`)
            .then(response => response.json())
    },
    saveUser: (newUser) => {
        return fetch(`${url}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
        }).then(response => response.json())
    },
    getAllCategories: () => {
        return fetch(`${url}/categories`)
            .then(response => response.json())
            .then(array => array.sort((a, b) => a.category.localeCompare(b.category)))
    }
}