import React from "react";
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom";
import "./NavBar.css"

const NavBar = props => {
    const handleLogout = () => {
        props.clearUser()
        props.history.push("/")
    }

    return (
        <header>
            <nav>
                <ul className="nav-ul">
                    <li className="nav-li">
                        <Link className="nav-title" to="/">
                            IMHAPPY
                        </Link>
                    </li>
                    {props.hasUser
                        ? <li className="nav-li">
                            <Link className="nav-link" to="/entries/new">
                                What made you happy today?
                            </Link>
                        </li>
                        : null}
                    {props.hasUser
                        ? <li className="nav-li">
                            <span className="nav-link" onClick={handleLogout}>Log out</span>
                        </li>
                        : <li className="nav-li">
                            <Link className="nav-link" to="/login">
                                Log in/Sign up
                            </Link>
                        </li>}
                </ul>
            </nav>
        </header>
    )
}

export default withRouter(NavBar)