import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Movies.css";

const Movies = () => {
  const [movies, setMovies] = useState(null);

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

  return (
    <>
      <h1 className="judul-section">Tabel Movie</h1>
      <table className="list-movie">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Year</th>
            <th>Duration</th>
            <th>Genre</th>
            <th>Rating</th>
            <th>Review</th>
            <th>Image URL</th>
          </tr>
        </thead>
        <tbody>
          {movies !== null &&
            movies.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.year}</td>
                  <td>{item.duration}</td>
                  <td>{item.genre}</td>
                  <td>{item.rating}</td>
                  <td>{item.review}</td>
                  <td>{item.image_url}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default Movies;
