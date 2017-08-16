import React, { Component } from 'react'
import { Feed, Segment, Dimmer, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { accounting } from 'accounting'
import moment from 'moment'

import { getPledges } from '../actions/projectActions'

class BackersPanel extends Component {

  state = {
    loading: true
  }

  componentDidMount() {
    const projectId = this.props.match.params.id
    this.props.getPledges(projectId).then(() => this.setState({loading: false}))
  }

  render() {
    const pledges = this.props.pledges.map( pledge => (
      <PledgeItem key={pledge.id} {...pledge} />
    ))

    return (
      <Dimmer.Dimmable as={Segment} dimmed={this.state.loading} attached='bottom' padded='very'>
        <Dimmer active={this.state.loading} inverted>
          <Loader />
        </Dimmer>
        {pledges.length > 0 ? pledges: <strong>No pledges have been made!</strong>}
      </Dimmer.Dimmable>
    )
  }
}

function PledgeItem({amount, created_at, user}) {
  const timeAgo = moment(created_at).fromNow()

  return (
    <Feed>
      <Feed.Event>
        <Feed.Label>
          <img src='http://lorempixel.com/200/200/technics' alt='' />
        </Feed.Label>
        <Feed.Content>
          <Feed.Summary>
            <Feed.User as='span' className='username'>
              {user.first_name} {user.last_name}
            </Feed.User> pledged {accounting.formatMoney(amount, '$', 0)}
            <Feed.Date>{timeAgo}</Feed.Date>
          </Feed.Summary>
        </Feed.Content>
      </Feed.Event>
    </Feed>
  )
}

function mapStateToProps(state) {
  return { pledges: state.projects.currentProject.pledges }
}

export default connect(mapStateToProps, { getPledges })(BackersPanel)
