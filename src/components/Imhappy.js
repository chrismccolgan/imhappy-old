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

    const clearUser = () => {
        sessionStorage.clear();
        setHasUser(isAuthenticated());
      }

    return (
        <React.Fragment>
            <NavBar hasUser={hasUser} clearUser={clearUser} />
            <ApplicationViews hasUser={hasUser} setUser={setUser} />
        </React.Fragment>
    );
};

export default Imhappy