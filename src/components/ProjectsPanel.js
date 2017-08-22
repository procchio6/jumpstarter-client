import React, {Component} from 'react'
import { Card } from 'semantic-ui-react'

import ProjectCard from './ProjectCard'

export class ProjectsPanel extends Component {

  render() {
    const projectCards = this.props.projects.map( project => {
      return <ProjectCard key={project.id} project={project} />
    })

    return (
      <div>
        {
          projectCards.length > 0 ?
          <Card.Group itemsPerRow={3} stackable>
            {projectCards}
          </Card.Group>
          :
          <strong>No projects to display!</strong>
        }
      </div>
    )
  }
}

export default ProjectsPanel
