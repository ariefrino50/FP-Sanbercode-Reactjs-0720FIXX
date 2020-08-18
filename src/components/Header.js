import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

const Header = () => {
  const [user, setUser] = useContext(UserContext);
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <header>
      <h1>Finale</h1>
      <div id="search-box">
        <SearchIcon />
        <InputBase className="input-search" placeholder="Cari . . ." />
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About </Link>{" "}
          </li>
          {user === null && (
            <li>
              <Link to="/login">Login </Link>
            </li>
          )}
          {user === null && (
            <li>
              <Link to="/register">Register </Link>
            </li>
          )}
          {user && (
            <li>
              <a style={{ cursor: "pointer" }} onClick={handleLogout}>
                Logout{" "}
              </a>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
