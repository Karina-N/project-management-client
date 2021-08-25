import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";

import ProjectList from "./components/projects/ProjectList";
import Navbar from "./components/navbar/Navbar";
import ProjectDetails from "./components/projects/ProjectDetails";
import Signup from "./components/auth/Signup";

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

  render() {
    return (
      <div className="App">
        <h1>Welcome to our project management app</h1>
        <Navbar userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} />
        <Switch>
          <Route exact path="/signup" render={(props) => <Signup {...props} getUser={this.getTheUser} />} />
          <Route exact path="/projects" component={ProjectList} />
          <Route exact path="/projects/:id" component={ProjectDetails} />
        </Switch>
      </div>
    );
  }
}

export default App;
