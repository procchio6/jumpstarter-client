import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Header, Card } from 'semantic-ui-react'
import queryString from 'query-string'

import { getProjects } from '../actions/projectActions'

import ProjectCard from '../components/ProjectCard'
import PaginationLinks from '../components/PaginationLinks'

class Home extends Component {

  constructor(props) {
    super(props)

    this.state = {
      currentPage: this.getCurrentPage()
    }
  }

  componentWillMount() {
    const currentPage = this.getCurrentPage()
    this.props.getProjects(currentPage)
  }

  componentWillReceiveProps(nextProps) {
    const nextQuery = nextProps.location.search
    let nextPage = queryString.parse(nextQuery).page
    nextPage = nextPage ? nextPage : '1'
    if (nextPage !== this.state.currentPage) {
      this.props.getProjects(nextPage)
      this.setState({currentPage: nextPage})
    }
  }

  getCurrentPage = () => {
    const query = this.props.location.search
    const currentPage = queryString.parse(query).page
    if (!!currentPage) {
      return currentPage
    } else {
      return '1'
    }
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

        {this.props.projects.length === 0 ? <Header size='small'>No projects to display!</Header> : null}

        <PaginationLinks
          data={this.props.projects.pagination}
          currentPage={this.getCurrentPage()}
          match={this.props.match}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {projects: state.projects}
}

export default connect(mapStateToProps, {getProjects})(Home)
