import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <nav className="nav-style">
      <ul>
        <li>{props.userIsLoggedIn ? "Hello " + props.userData.username : "Please login"}</li>
        <li>
          <Link to="/projects">Projects</Link>
        </li>
        <li>
          <Link to="/signup">Register</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
