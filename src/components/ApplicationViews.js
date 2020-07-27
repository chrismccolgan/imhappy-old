import { Route } from "react-router-dom";
import React from "react";
import Home from "./home/Home";
import EntryCard from "./entry/EntryCard";
import EntryList from "./entry/EntryList";
import EntryForm from "./entry/EntryForm";

const ApplicationViews = () => {
    return (
        <React.Fragment>
            <Route
                exact
                path="/"
                render={props => {
                    return <Home />
                }}
            />
            <Route
                exact 
                path="/entries"
                render={(props) => {
                    return <EntryList {...props} />
                }}
            />
            <Route 
                path="/entries/new"
                render={(props) => {
                    return <EntryForm {...props} />
                }}
            />
        </React.Fragment>
    );
};

export default ApplicationViews;