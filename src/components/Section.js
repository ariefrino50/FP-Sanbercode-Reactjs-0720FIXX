import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import About from "../pages/About";
import Home from "../pages/Home";
import Movies from "../pages/Movies";
import ListMovie from "../pages/ListMovie";
import TambahMovie from "../pages/TambahMovie";
import TambahGame from "../pages/TambahGame";
import EditGame from "../pages/EditGame";
import ListGame from "../pages/ListGame";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { UserContext } from "../context/UserContext";

const Section = () => {
  const [user] = useContext(UserContext);

  const PrivateRoute = ({ user, ...props }) => {
    if (user) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  const LoginRoute = ({ user, ...props }) =>
    user ? <Redirect to="/" /> : <Route {...props} />;

  return (
    <>
      <Switch>
        <LoginRoute exact path="/login" user={user} component={Login} />
        <Route exact path="/register" user={user} component={Register} />
      </Switch>
      <section>
        <Switch>
          <Route exact path="/" user={user} component={Home} />
          <Route exact path="/about" user={user} component={About} />
          <Route exact path="/list-movie" user={user} component={ListMovie} />
          <Route exact path="/list-game" user={user} component={ListGame} />
          <PrivateRoute
            exact
            path="/tambah-movie"
            user={user}
            component={TambahMovie}
          />
          <PrivateRoute
            exact
            path="/edit-movie"
            user={user}
            component={Movies}
          />
          <PrivateRoute
            exact
            path="/tambah-game"
            user={user}
            component={TambahGame}
          />
          <PrivateRoute
            exact
            path="/edit-game"
            user={user}
            component={EditGame}
          />
        </Switch>
      </section>
    </>
  );
};

export default Section;
