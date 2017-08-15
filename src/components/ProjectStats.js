import React, { Component } from 'react'
import { Card, Progress, Statistic } from 'semantic-ui-react'

export default class ProjectStats extends Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Progress size='small' percent={this.props.percent_funded} success/>
          <Statistic.Group size='tiny' items={this.props.statistics} />
        </Card.Content>
      </Card>
    )
  }
}
