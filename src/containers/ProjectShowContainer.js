import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Grid, Header, Image, Sticky, Segment, Button } from 'semantic-ui-react'
import accounting from 'accounting'

import { getProject } from '../actions/projectActions'
import { createPledge } from '../actions/pledgeActions'

import PledgeCard from '../components/PledgeCard'
import ProjectDetailsPanel from './ProjectDetailsPanel'
import ProjectStats from '../components/ProjectStats'

class ProjectShowContainer extends Component {

  state = {
    loading: true
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    const projectId = this.props.match.params.id
    this.props.getProject(projectId).then(() => this.setState({loading: false}))
  }

  handleContextRef = contextRef => this.setState({ contextRef })

  render() {
    const project = this.props.project
    const pledgeTotal = accounting.formatMoney(project.pledge_total, '$', 0)
    const fundingGoal = accounting.formatMoney(project.funding_goal, '$', 0)
    const numOfBackers = project.number_of_backers ? project.number_of_backers : '0'
    const daysLeft = project.days_left ? project.days_left : '0'

    const statistics = [
      {label: `pledged of ${fundingGoal} goal`, value: `${pledgeTotal}`},
      {label: 'backers', value: `${numOfBackers}`},
      {label: 'days to go', value: `${daysLeft}`}
    ]

    const { contextRef } = this.state


    const isProjectCurrentUsers = (() => {
      if (project.creator) {
        return project.creator.id === this.props.currentUserId
      } else {
        return false
      }
    })()

    const projectOver = project.days_left <= 0

    return (
      <div ref={this.handleContextRef}>
        <Grid>
          <Grid.Column width={12}>
            <Header as='h1'>{project.name}</Header>
            <p>{project.description}</p>
            {
              project.image && !project.image.url.includes('default') && !this.state.loading ?
              <Image fluid src={project.image.url} /> : null
            }
            <ProjectDetailsPanel project={project} loading={this.state.loading} />
          </Grid.Column>
          <Grid.Column width={4} >
            <div className='projectShowSidebar'>
              <Sticky offset={80} context={contextRef}>
                <ProjectStats
                  statistics={statistics}
                  percent_funded={project.percent_funded}
                  loading={this.state.loading}
                />
                <PledgeCard
                  projectId={project.id}
                  onCreatePledge={this.props.createPledge}
                  disabled={projectOver || isProjectCurrentUsers || !this.props.currentUserId}
                />
                {
                  isProjectCurrentUsers &&
                  <Segment>
                    <Button as={Link} to={`${this.props.match.url}/edit`} fluid positive>
                      Edit Project
                    </Button>
                  </Segment>
                }
              </Sticky>
            </div>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    project: state.projects.currentProject,
    currentUserId: state.auth.currentUser.id
  }
}

export default connect(mapStateToProps, {getProject, createPledge})(ProjectShowContainer)
