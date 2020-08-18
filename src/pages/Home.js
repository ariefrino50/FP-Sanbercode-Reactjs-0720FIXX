import React, { Component } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import GradeIcon from "@material-ui/icons/Grade";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      games: [],
    };
  }

  componentDidMount() {
    axios
      .get(`https://www.backendexample.sanbersy.com/api/movies`)
      .then((res) => {
        let movies = res.data.map((el) => {
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
        });
        this.setState({ movies });
      });

    axios
      .get(`https://www.backendexample.sanbersy.com/api/games`)
      .then((res) => {
        let games = res.data.map((el) => {
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
        });
        this.setState({ games });
      });
  }

  render() {
    return (
      <>
        <h1>Tabel Movie</h1>
        <br />
        <div id="article-list">
          <Grid container fixed>
            {this.state.movies.map((item) => {
              return (
                <Grid items xs={4}>
                  <div className="container-movie">
                    <div className="konten-movie">
                      <h3>{item.title}</h3>
                      <div className="rating">
                        <GradeIcon
                          fontSize="small"
                          color="secondary"
                          style={{ display: "flex" }}
                        />
                        <p>
                          <b>{item.rating}</b> / 10
                        </p>
                      </div>
                    </div>
                    <img src={item.image_url} alt="Tidak ada gambar" />
                    <div className="kotak-movie"></div>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </div>

        <br />
        <br />
        <h1>Tabel Game</h1>
        <br />
        <div id="article-list">
          <Grid container fixed>
            {this.state.games.map((item) => {
              return (
                <Grid items xs={4}>
                  <div className="container-movie">
                    <div className="konten-movie">
                      <h3>{item.name}</h3>
                      <div className="genre">
                        <p>{item.genre}</p>
                      </div>
                    </div>
                    <img src={item.image_url} alt="Tidak ada gambar" />
                    <div className="kotak-movie"></div>
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </div>
      </>
    );
  }
}

export default Home;
