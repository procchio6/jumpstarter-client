import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

export default class ProjectDetailsMenu extends Component {
  render() {
    const { url } = this.props.match

    return (
      <Menu attached='top' tabular>
        <Menu.Item name='Campaign' as={NavLink} exact to={`${url}`} />
        <Menu.Item name='Comments' as={NavLink} to={`${url}/comments`} />
        <Menu.Item name='Backers' as={NavLink} to={`${url}/backers`} />
      </Menu>
    )
  }
}
