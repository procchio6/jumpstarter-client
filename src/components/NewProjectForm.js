import React, { Component } from 'react'
import { connect } from 'react-redux'

import { createProject } from '../actions/projectActions'
import history from '../history'

import ProjectForm from './ProjectForm'

class NewProjectForm extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <ProjectForm
        onSubmit={ (projectData) => {
          this.props.createProject(projectData)
        }}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    project: state.projects.currentProject,
    currentUserId: state.auth.currentUser.id
  }
}

export default connect(mapStateToProps, {createProject})(NewProjectForm)
