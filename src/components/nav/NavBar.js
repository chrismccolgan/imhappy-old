import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css"

const NavBar = props => {
    return (
        <header>
            NAVBAR
            <nav>
                <ul>
                    <li>
                        <Link className="nav-link" to="/">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/entries">
                            Entries
                        </Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/entries/new">
                            New Entry
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default NavBar;