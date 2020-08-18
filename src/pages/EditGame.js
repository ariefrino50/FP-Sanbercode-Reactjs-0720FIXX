import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Movies.css";
import { Button } from "@material-ui/core";

const ListGame = () => {
  const [games, setGames] = useState(null);
  const [input, setInput] = useState({
    name: "",
    genre: "",
    singlePlayer: 0,
    multiplayer: 0,
    platform: "",
    release: 2020,
    image_url: "",
  });
  const [selectedId, setSelectedId] = useState(0);
  const [statusForm, setStatusForm] = useState("create");

  useEffect(() => {
    if (games === null) {
      axios
        .get(`https://www.backendexample.sanbersy.com/api/games`)
        .then((res) => {
          setGames(
            res.data.map((el) => {
              return {
                id: el.id,
                name: el.name,
                genre: el.genre,
                singlePlayer: el.singlePlayer,
                multiplayer: el.multiplayer,
                platform: el.platform,
                release: el.release,
                image_url: el.image_url,
              };
            })
          );
        });
    }
  }, [games]);

  const handleChange = (event) => {
    let typeOfInput = event.target.name;

    switch (typeOfInput) {
      case "name": {
        setInput({ ...input, name: event.target.value });
        break;
      }
      case "genre": {
        setInput({ ...input, genre: event.target.value });
        break;
      }
      case "singlePlayer": {
        setInput({ ...input, singlePlayer: event.target.value });
        break;
      }
      case "multiplayer": {
        setInput({ ...input, multiplayer: event.target.value });
        break;
      }
      case "platform": {
        setInput({ ...input, platform: event.target.value });
        break;
      }
      case "release": {
        setInput({ ...input, release: event.target.value });
        break;
      }
      case "image_url": {
        setInput({ ...input, image_url: event.target.value });
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleSubmit = (event) => {
    // menahan submit
    event.preventDefault();

    let name = input.name;
    console.log(input);

    if (name.replace(/\s/g, "") !== "") {
      if (statusForm === "create") {
        axios
          .post(`https://www.backendexample.sanbersy.com/api/games`, {
            id: input.id,
            name: input.name,
            genre: input.genre,
            singlePlayer: input.singlePlayer,
            multiplayer: input.multiplayer,
            platform: input.platform,
            release: input.release,
            image_url: input.image_url,
          })
          .then((res) => {
            setGames([...games, { id: res.data.id, ...input }]);
          });
      } else if (statusForm === "edit") {
        axios
          .put(
            `https://www.backendexample.sanbersy.com/api/games/${selectedId}`,
            {
              id: input.id,
              name: input.name,
              genre: input.genre,
              singlePlayer: input.singlePlayer,
              multiplayer: input.multiplayer,
              platform: input.platform,
              release: input.release,
              image_url: input.image_url,
            }
          )
          .then((res) => {
            let singleGames = games.find((el) => el.id === selectedId);
            singleGames.name = input.name;
            singleGames.genre = input.genre;
            singleGames.singlePlayer = input.singlePlayer;
            singleGames.multiplayer = input.multiplayer;
            singleGames.platform = input.platform;
            singleGames.release = input.release;
            singleGames.image_url = input.image_url;
            setGames([...games]);
          });
      }

      setStatusForm("create");
      setSelectedId(0);
      setInput({
        title: "",
        description: "",
        year: 2020,
        duration: 120,
        genre: "",
        rating: 0,
        review: "",
        image_url: "",
      });
    }
  };

  const Action = ({ itemId }) => {
    const handleEdit = () => {
      let singleGames = games.find((x) => x.id === itemId);
      setInput({
        title: singleGames.title,
        description: singleGames.description,
        year: singleGames.year,
        duration: singleGames.duration,
        genre: singleGames.genre,
        rating: singleGames.rating,
        review: singleGames.review,
        image_url: singleGames.image_url,
      });
      setSelectedId(itemId);
      setStatusForm("edit");
    };

    return (
      <>
        <button onClick={handleEdit}>Edit</button>
        &nbsp;
      </>
    );
  };

  return (
    <>
      <h1 className="judul-section">Edit Game</h1>
      <table className="list-movie">
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Genre</th>
            <th>Single Player</th>
            <th>Multiplayer</th>
            <th>Platform</th>
            <th>Release</th>
            <th>Image URL</th>
          </tr>
        </thead>
        <tbody>
          {games !== null &&
            games.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.genre}</td>
                  <td>{item.singlePlayer}</td>
                  <td>{item.multiplayer}</td>
                  <td>{item.platform}</td>
                  <td>{item.release}</td>
                  <td>{item.image_url}</td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <h1 className="judul-section">Form Edit Game</h1>
      <form className="tambah-movie" onSubmit={handleSubmit}>
        <div>
          <label>Name :</label>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={handleChange}
          />
          <br />
          <br />
        </div>
        <div>
          <label>Genre :</label>
          <input
            type="text"
            name="genre"
            value={input.genre}
            onChange={handleChange}
          />
          <br />
          <br />
        </div>
        <div style={{ marginTop: "20px" }}>
          <label>Single Player :</label>
          <input
            type="number"
            max={1}
            min={0}
            name="singlePlayer"
            value={input.singlePlayer}
            onChange={handleChange}
          />
          <br />
          <br />
        </div>
        <div style={{ marginTop: "20px" }}>
          <label>Multiplayer :</label>
          <input
            type="number"
            max={1}
            min={0}
            name="multiplayer"
            value={input.multiplayer}
            onChange={handleChange}
          />
          <br />
          <br />
        </div>
        <div style={{ marginTop: "20px" }}>
          <label>Platform :</label>
          <input
            type="text"
            name="platform"
            value={input.platform}
            onChange={handleChange}
          />
          <br />
          <br />
        </div>
        <div style={{ marginTop: "20px" }}>
          <label>Release :</label>
          <input
            type="number"
            max={2020}
            min={1980}
            name="release"
            value={input.release}
            onChange={handleChange}
          />
          <br />
          <br />
        </div>
        <div style={{ marginTop: "20px" }}>
          <label>Image URL:</label>
          <input
            type="text"
            name="image_url"
            value={input.image_url}
            onChange={handleChange}
          />
          <br />
          <br />
        </div>
        <Button
          className="Button btn-daftar"
          variant="contained"
          color="secondary"
          style={{ float: "right", width: "200px" }}
          onClick={handleSubmit}
        >
          submit
        </Button>
      </form>
    </>
  );
};

export default ListGame;
