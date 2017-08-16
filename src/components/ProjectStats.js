import React, { Component } from 'react'
import { Card, Progress, Statistic, Dimmer, Loader } from 'semantic-ui-react'

export default class ProjectStats extends Component {
  render() {
    return (
      <Dimmer.Dimmable as={Card}>
        <Dimmer active={this.props.loading} inverted>
          <Loader />
        </Dimmer>
        <Card.Content>
          <Progress size='small' percent={this.props.percent_funded} success/>
          <Statistic.Group size='tiny' items={this.props.statistics} />
        </Card.Content>
      </Dimmer.Dimmable>
    )
  }
}
