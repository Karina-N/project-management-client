import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import AddProject from "./AddProject";

class ProjectList extends React.Component {
  state = {
    listOfProjects: [],
  };

  componentDidMount() {
    this.getAllProjects();
  }

  getAllProjects = () => {
    axios.get(`http://localhost:5000/api/projects`, { withCredentials: true })
    .then((responseFromApi) => {
      this.setState({
        listOfProjects: responseFromApi.data,
      });
    });
  };

  renderProjects() {
    return this.state.listOfProjects.map((project) => {
      return (
        <div key={project._id}>
          <Link to={`/projects/${project._id}`}>
            <h3>{project.title}</h3>
          </Link>
        </div>
      );
    });
  }

  render() {
    return (
      <>
        <div>{this.state.listOfProjects.length ? this.renderProjects() : "Loading"}</div>
        <hr />
        {this.props.userIsLoggedIn ? (
          <AddProject getData={() => this.getAllProjects()} />
        ) : (
          <p>Login to create new projects</p>
        )}
      </>
    );
  }
}

export default ProjectList;
