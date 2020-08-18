import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [user] = useContext(UserContext);

  return (
    <div id="sidebar">
      <h1>Finale</h1>
      <nav>
        <ul>
          <li>
            <Link to="/list-movie">Tabel Movie</Link>{" "}
          </li>
          {user && (
            <li>
              <Link to="/tambah-movie">Tambah Movie</Link>
            </li>
          )}
          {user && (
            <li>
              <Link to="/edit-movie">Edit Movie</Link>
            </li>
          )}
          <li>
            <Link to="/list-game">Tabel Game</Link>{" "}
          </li>
          {user && (
            <li>
              <Link to="/tambah-game">Tambah Game</Link>
            </li>
          )}
          {user && (
            <li>
              <Link to="/edit-game">Edit Game</Link>
            </li>
          )}
          {user && (
            <li>
              <Link to="/ubah-password">Ubah Password</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}
