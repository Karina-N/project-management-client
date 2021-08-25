import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import ProjectList from "./components/projects/ProjectList";
import Navbar from "./components/navbar/Navbar";
import ProjectDetails from "./components/projects/ProjectDetails";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import authService from "./services/auth-service";
import ProtectedRoute from "./components/auth/ProtectedRoute";

class App extends React.Component {
  state = {
    isLoggedIn: false,
    user: null,
  };

  getTheUser = (userObj, loggedIn) => {
    this.setState({
      user: userObj,
      isLoggedIn: loggedIn,
    });
  };

  fetchUser = () => {
    if (this.state.user === null) {
      authService
        .loggedin()
        .then((data) => {
          this.setState({
            user: data,
            isLoggedIn: true,
          });
        })
        .catch((err) => {
          this.setState({
            user: null,
            isLoggedIn: false,
          });
        });
    }
  };

  componentDidMount() {
    this.fetchUser();
  }

  render() {
    return (
      <div className="App">
        <h1>Welcome to our project management app</h1>
        <Navbar userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} getUser={this.getTheUser} />
        <Switch>
          <Route exact path="/" render={(props) => <Login {...props} getUser={this.getTheUser} />} />
          <Route exact path="/signup" render={(props) => <Signup {...props} getUser={this.getTheUser} />} />

          <ProtectedRoute exact path="/projects/:id" user={this.state.user} component={ProjectDetails} />
          <ProtectedRoute exact path="/projects" user={this.state.user} component={ProjectList} />
        </Switch>
      </div>
    );
  }
}

export default App;
