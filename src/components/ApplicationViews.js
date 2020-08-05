import { Route, Redirect } from "react-router-dom"
import React from "react"
import Home from "./home/Home"
import EntryList from "./entry/EntryList"
import EntryForm from "./entry/EntryForm"
import EntryEditForm from "./entry/EntryEditForm"
import Login from "./auth/Login"

const ApplicationViews = (props) => {
    const hasUser = props.hasUser
    const setUser = props.setUser
    return (
        <>
            <Route
                path="/login"
                render={props => {
                    return <Login setUser={setUser} {...props} />
                }} />
            <Route
                exact
                path="/"
                render={props => {
                    if (hasUser) {
                        return <Home {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
            <Route
                exact
                path="/entries"
                render={(props) => {
                    if (hasUser) {
                        return <EntryList {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
            <Route
                path="/entries/new"
                render={(props) => {
                    if (hasUser) {
                        return <EntryForm {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
            <Route
                path="/entries/:entryId(\d+)/edit"
                render={(props) => {
                    if (hasUser) {
                        return <EntryEditForm {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
        </>
    )
}

export default ApplicationViews