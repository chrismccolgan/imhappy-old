import React from "react";
import EntryCard from "./entry/EntryCard";
import ApplicationViews from "./ApplicationViews";
import "./Imhappy.css";
import NavBar from "./nav/NavBar";

const Imhappy = () => {
    return (
        <React.Fragment>
            <NavBar />
            <ApplicationViews />
        </React.Fragment>
    );
};

export default Imhappy