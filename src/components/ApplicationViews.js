import { Route, Redirect } from "react-router-dom"
import React from "react"
import Home from "./home/Home"
import EntryList from "./entry/EntryList"
import EntryForm from "./entry/EntryForm"
import EntryEditForm from "./entry/EntryEditForm"
import Login from "./auth/Login";

const ApplicationViews = () => {
    const isAuthenticated = () => sessionStorage.getItem("credentials") !== null;
    return (
        <React.Fragment>
            <Route
                path="/login"
                component={Login} />
            <Route
                exact
                path="/"
                render={props => {
                    if (isAuthenticated()) {
                        return <Home {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
            <Route
                exact
                path="/entries"
                render={(props) => {
                    if (isAuthenticated()) {
                        return <EntryList {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
            <Route
                path="/entries/new"
                render={(props) => {
                    if (isAuthenticated()) {
                        return <EntryForm {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
            <Route
                path="/entries/:entryId(\d+)/edit"
                render={(props) => {
                    if (isAuthenticated()) {
                        return <EntryEditForm {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
        </React.Fragment>
    )
}

export default ApplicationViews