import React, { Component } from 'react'
import { connect } from 'react-redux'

class ProjectsContainer extends Component {
  render() {
    return <div>Project Container</div>
  }
}

function mapStateToProps(state) {
  return {projects: state.projects}
}

export default connect(mapStateToProps)(ProjectsContainer)
