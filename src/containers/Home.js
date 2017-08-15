import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Card } from 'semantic-ui-react'

import { getProjects } from '../actions/projectActions'

import ProjectCard from '../components/ProjectCard'

class Home extends Component {

  componentWillMount() {
    this.props.getProjects()
  }

  render() {
    const projectCards = this.props.projects.list.map( project => (
      <ProjectCard key={project.id} project={project} />
    ))

    return (
      <div>
        <Header size='large' dividing>Projects</Header>
        <Card.Group itemsPerRow={3} stackable>
          {projectCards}
        </Card.Group>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {projects: state.projects}
}

export default connect(mapStateToProps, {getProjects})(Home)
