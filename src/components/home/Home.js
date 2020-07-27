import React from "react";
import EntryList from "../entry/EntryList";

const Home = props => {
    return (
        <React.Fragment>
            <EntryList {...props} />
        </React.Fragment>
    );
};

export default Home;