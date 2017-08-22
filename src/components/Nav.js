import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Dropdown, Menu } from 'semantic-ui-react'
import { connect } from 'react-redux'

import { logoutUser } from '../actions/authActions'

class Nav extends Component {

render() {

  return (
    <Menu inverted fluid borderless fixed='top'>
      <Menu.Item name='explore' as={NavLink} exact to='/' >
         Explore
      </Menu.Item>

      <Menu.Item name='startAProject' as={NavLink} to='/projects/new'>
        Start a Project
      </Menu.Item>

      <Menu.Item header className='navLogo'>
        <Link to='/'>
          JUMP<span style={{color:'#21BA45'}}>STARTER</span>
        </Link>
      </Menu.Item>

        {this.props.auth.loggedIn ?
          <Menu.Menu position='right'>
            <Menu.Item as={NavLink} to={`/users/${this.props.auth.currentUser.id}/funded_projects`} >
              Backed Projects
            </Menu.Item>
            <Dropdown item text={this.props.auth.currentUser.username}>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={`/users/${this.props.auth.currentUser.id}/projects`}>
                  My Projects
                </Dropdown.Item>
                <Dropdown.Item>Edit Account</Dropdown.Item>
                <Dropdown.Item as={Link} to='/logout' onClick={this.props.logoutUser}>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
        :
          <Menu.Menu position='right'>
            <Menu.Item name='login' as={NavLink} to='/login' >
              Login
            </Menu.Item>
          </Menu.Menu>
        }
    </Menu>
  )
}
}

function mapStateToProps({auth}) {
  return {auth}
}

export default connect(mapStateToProps, {logoutUser})(Nav)
