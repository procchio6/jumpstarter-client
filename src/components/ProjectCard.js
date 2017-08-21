import React, { Component } from 'react'
import { Card, Image, Progress, Statistic } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import accounting from 'accounting'


class ProjectCard extends Component {
  render() {
    const { project } = this.props

    const pledgeTotal = accounting.formatMoney(project.pledge_total, '$', 0)

    const statistics = [
      {label: 'pledged', value: pledgeTotal},
      {label: 'funded', value: `${project.percent_funded.toFixed()}%`},
      {label: 'days to go', value: project.days_left}
    ]

    return (
      <Card className='projectCard' link as={Link} to={`/projects/${project.id}`}>
        {
          project.image ?
          <Image fluid src={project.image.url} /> : null
        }
        <Card.Content>
          <Card.Header>{project.name}</Card.Header>
          <Card.Meta>{project.category.name}</Card.Meta>
          <Card.Description>
            {project.description}
          </Card.Description>
          <Card.Meta className='creator'>
            <Image size='mini' avatar src='http://lorempixel.com/100/100'/>
            <span>by {project.creator.full_name}</span>
          </Card.Meta>
        </Card.Content>
        <Card.Content extra className='projectStats'>
          <Progress size='tiny' percent={project.percent_funded} success/>
          <Statistic.Group horizontal size='mini' items={statistics} />
        </Card.Content>
      </Card>
    )
  }
}

export default ProjectCard
