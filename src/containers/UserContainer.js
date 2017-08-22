import React, {Component} from 'react'
import { Route, Switch, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Header, Menu } from 'semantic-ui-react'

import ProjectsPanel from '../components/ProjectsPanel'

import { getBackedProjects, getUserProjects } from '../actions/projectActions'
import { selectUser } from '../actions/authActions'

export class UserContainer extends Component {

  componentDidMount() {
    const userId = this.props.match.params.id
    this.getData(userId)
  }

  componentWillReceiveProps(nextProps) {
    const userId = this.props.match.params.id
    const nextUserId = nextProps.match.params.id
    if (nextUserId !== userId) {
      this.getData(nextUserId)
    }
  }

  getData = (userId) => {
    this.props.selectUser(userId)
    this.props.getBackedProjects(userId)
    this.props.getUserProjects(userId)
  }

  render() {
    const { url } = this.props.match

    return (
      <div>
        {
          Object.values(this.props.user).length > 0 ?
          <Header size='large'>
            {`${this.props.user.first_name} ${this.props.user.last_name}`}
            <Header.Subheader>
              {`@${this.props.user.username}`}
            </Header.Subheader>
          </Header> : null
        }

        <Menu pointing secondary>
          <Menu.Item name='Backed Projects' as={NavLink} exact to={`${url}/backed_projects`} />
          <Menu.Item name='Created Projects' as={NavLink} to={`${url}/projects`} />
        </Menu>
        <Switch>
          <Route path={`${url}/backed_projects`} render={(props) => {
            return <ProjectsPanel projects={this.props.backedProjects} {...props} />
          }}
          />
          <Route path={`${url}/projects`} render={(props) => {
            return <ProjectsPanel projects={this.props.usersProjects} {...props} />
          }} />
        </Switch>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.selectedUser.info,
    backedProjects: state.selectedUser.backedProjects,
    usersProjects: state.selectedUser.createdProjects
  }
}

const actionCreators = {getBackedProjects, getUserProjects, selectUser}

export default connect(mapStateToProps, actionCreators)(UserContainer)
