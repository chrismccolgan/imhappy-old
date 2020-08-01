import React, { useState } from "react";
import ApplicationViews from "./ApplicationViews";
import "./Imhappy.css";
import NavBar from "./nav/NavBar";

const Imhappy = () => {
    const isAuthenticated = () => sessionStorage.getItem("activeUser") !== null;
    const [hasUser, setHasUser] = useState(isAuthenticated())

    const setUser = user => {
        sessionStorage.setItem("activeUser", user.id)
        setHasUser(isAuthenticated())
    }


    return (
        <React.Fragment>
            <NavBar hasUser={hasUser} />
            <ApplicationViews hasUser={hasUser} setUser={setUser} />
        </React.Fragment>
    );
};

export default Imhappy