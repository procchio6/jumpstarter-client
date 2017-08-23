import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getProject, updateProject } from '../actions/projectActions'
import history from '../history'

import ProjectForm from './ProjectForm'

class EditProject extends Component {
  state = {
    loading: true
  }

  componentWillMount() {
    this.checkCurrentUserIsProjectCreator()
  }

  componentWillUpdate() {
    this.checkCurrentUserIsProjectCreator()
  }

  checkCurrentUserIsProjectCreator() {
    if (!!this.props.project.creator) {
      if (this.props.project.creator.id !== this.props.currentUserId) {
        history.push(`/projects/${this.props.project.id}`)
      }
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    const projectId = this.props.match.params.id
    this.props.getProject(projectId).then(() => this.setState({loading: false}))
  }

  render() {
    return (
      <ProjectForm
        project={this.props.project}
        onSubmit={ (projectData) => {
          this.props.updateProject(projectData)
        }} />
    )
  }
}

function mapStateToProps(state) {
  return {
    project: state.projects.currentProject,
    currentUserId: state.auth.currentUser.id
  }
}

export default connect(mapStateToProps, {getProject, updateProject})(EditProject)
