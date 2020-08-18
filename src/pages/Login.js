import React, { useContext, useState, Component } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import {
  Grid,
  Container,
  FormGroup,
  FormControl,
  TextField,
  Button,
} from "@material-ui/core";

const Login = () => {
  const [, setUser] = useContext(UserContext);
  const [input, setInput] = useState({ username: "", password: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (input.username === "admin" && input.password === "admin") {
      setUser({ username: input.username });
      localStorage.setItem(
        "user",
        JSON.stringify({ username: "admin", password: "admin" })
      );
    } else {
      alert("username dan password gagal");
    }
  };

  const handleChange = (event) => {
    let value = event.target.value;
    let name = event.target.name;
    switch (name) {
      case "username": {
        setInput({ ...input, username: value });
        break;
      }
      case "password": {
        setInput({ ...input, password: value });
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <>
      <div className="login-page">
        <Container fixed style={{ margin: "50px" }}>
          <Grid container spacing={3}>
            <Grid item md={7} className="judul">
              <h1>Finale</h1>
              
            </Grid>
            <Grid item md={1}></Grid>
            <Grid item md={4}>
              <Grid className="login-box">
                <h3 className="h3-padding">Silahkan Masuk</h3>
                <form onSubmit={handleSubmit}>
                  <FormGroup>
                    <FormControl>
                      <TextField
                        onChange={handleChange}
                        value={input.username}
                        name="username"
                        id="outlined-basic"
                        className="form-fill"
                        label="Username"
                        variant="outlined"
                        fullWidth={true}
                        required
                      />
                      <TextField
                        id="form-password"
                        className="form-fill"
                        label="Password"
                        variant="outlined"
                        fullWidth={true}
                        type="password"
                        required
                        name="password"
                        onChange={handleChange}
                        value={input.password}
                      />
                      <Button
                        onClick={handleSubmit}
                        className="button btn-daftar"
                        variant="contained"
                        color="primary"
                      >
                        Masuk
                      </Button>
                    </FormControl>
                    <p className="silahkan-masuk">
                      Belum punya Akun? Silahkan <a href="/register">Daftar</a>
                    </p>
                  </FormGroup>
                </form>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Login;
