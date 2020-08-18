import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Movies.css";
import { Button } from "@material-ui/core";

const TambahMovie = () => {
  const [movies, setMovies] = useState(null);
  const [input, setInput] = useState({
    title: "",
    description: "",
    year: 2020,
    duration: 120,
    genre: "",
    rating: 0,
  });
  const [selectedId, setSelectedId] = useState(0);
  const [statusForm, setStatusForm] = useState("create");

  useEffect(() => {
    if (movies === null) {
      axios
        .get(`https://www.backendexample.sanbersy.com/api/movies`)
        .then((res) => {
          setMovies(
            res.data.map((el) => {
              return {
                id: el.id,
                title: el.title,
                description: el.description,
                year: el.year,
                duration: el.duration,
                genre: el.genre,
                rating: el.rating,
                review: el.review,
                image_url: el.image_url,
              };
            })
          );
        });
    }
  }, [movies]);

  const handleChange = (event) => {
    let typeOfInput = event.target.name;

    switch (typeOfInput) {
      case "title": {
        setInput({ ...input, title: event.target.value });
        break;
      }
      case "description": {
        setInput({ ...input, description: event.target.value });
        break;
      }
      case "year": {
        setInput({ ...input, year: event.target.value });
        break;
      }
      case "duration": {
        setInput({ ...input, duration: event.target.value });
        break;
      }
      case "genre": {
        setInput({ ...input, genre: event.target.value });
        break;
      }
      case "rating": {
        setInput({ ...input, rating: event.target.value });
        break;
      }
      case "review": {
        setInput({ ...input, review: event.target.value });
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

    let title = input.title;
    console.log(input);

    if (title.replace(/\s/g, "") !== "") {
      if (statusForm === "create") {
        axios
          .post(`https://www.backendexample.sanbersy.com/api/movies`, {
            title: input.title,
            description: input.description,
            year: input.year,
            duration: input.duration,
            genre: input.genre,
            rating: parseInt(input.rating),
            review: input.review,
            image_url: input.image_url,
          })
          .then((res) => {
            setMovies([...movies, { id: res.data.id, ...input }]);
          });
      } else if (statusForm === "edit") {
        axios
          .put(
            `https://www.backendexample.sanbersy.com/api/movies/${selectedId}`,
            {
              title: input.title,
              description: input.description,
              year: input.year,
              duration: input.duration,
              genre: input.genre,
              rating: parseInt(input.rating),
              review: input.review,
              image_url: input.image_url,
            }
          )
          .then((res) => {
            let singleMovie = movies.find((el) => el.id === selectedId);
            singleMovie.title = input.title;
            singleMovie.description = input.description;
            singleMovie.year = input.year;
            singleMovie.duration = input.duration;
            singleMovie.genre = input.genre;
            singleMovie.rating = input.rating;
            singleMovie.review = input.review;
            singleMovie.image_url = input.image_url;
            setMovies([...movies]);
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
    const handleDelete = () => {
      let newMovies = movies.filter((el) => el.id !== itemId);

      axios
        .delete(`https://www.backendexample.sanbersy.com/api/movies/${itemId}`)
        .then((res) => {
          console.log(res);
        });

      setMovies([...newMovies]);
    };

    const handleEdit = () => {
      let singleMovie = movies.find((x) => x.id === itemId);
      setInput({
        title: singleMovie.title,
        description: singleMovie.description,
        year: singleMovie.year,
        duration: singleMovie.duration,
        genre: singleMovie.genre,
        rating: singleMovie.rating,
        review: singleMovie.review,
        image_url: singleMovie.image_url,
      });
      setSelectedId(itemId);
      setStatusForm("edit");
    };

    return (
      <>
        <button onClick={handleEdit}>Edit</button>
        &nbsp;
        <button onClick={handleDelete}>Delete</button>
      </>
    );
  };

  return (
    <>
      <h1 className="judul-section">Form Tambah Movies</h1>
      <form className="tambah-movie" onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={input.title}
            onChange={handleChange}
          />
          <br />
          <br />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            type="text"
            name="description"
            value={input.description}
            onChange={handleChange}
          />
          <br />
          <br />
        </div>
        <div style={{ marginTop: "20px" }}>
          <label>Year:</label>
          <input
            type="number"
            max={2020}
            min={1980}
            name="year"
            value={input.year}
            onChange={handleChange}
          />
          <br />
          <br />
        </div>
        <div style={{ marginTop: "20px" }}>
          <label>Duration:</label>
          <input
            type="number"
            name="duration"
            value={input.duration}
            onChange={handleChange}
          />
          <br />
          <br />
        </div>
        <div style={{ marginTop: "20px" }}>
          <label>Genre:</label>
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
          <label>Rating:</label>
          <input
            type="number"
            max={10}
            min={0}
            name="rating"
            value={input.rating}
            onChange={handleChange}
          />
          <br />
          <br />
        </div>
        <div style={{ marginTop: "20px" }}>
          <label>Review:</label>
          <textarea
            type="text"
            name="review"
            value={input.review}
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

export default TambahMovie;
