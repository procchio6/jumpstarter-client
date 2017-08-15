import React, { Component } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Container } from 'semantic-ui-react'

import { getCurrentUser } from './actions/authActions'

import Authorize from './Authorize'
import Home from './containers/Home'
import LoginForm from './components/LoginForm'
import Nav from './components/Nav'
import NewProjectForm from './components/NewProjectForm'
import ProjectsContainer from './containers/ProjectsContainer'
import ProjectShowContainer from './containers/ProjectShowContainer'
import SignupForm from './components/SignupForm'

import './stylesheets/App.css';

class App extends Component {

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.getCurrentUser()
    }
  }

  render() {
    return (
      <div>
        <Route path='/' component={Nav} />
        <Container>
          <Switch>
            <Route exact path='/' component={Home} />

            <Route path='/projects/new' component={Authorize(NewProjectForm)} />
            <Route path='projects/me' component={ProjectShowContainer} />
            <Route path='/projects/:id' component={ProjectShowContainer} />
            <Route exact path='/projects' component={ProjectsContainer} />

            <Route path='/login'
              render={ ({history}) => (
                this.props.auth.loggedIn ? <Redirect to='/' /> : <LoginForm history={history}/>
              )}
            />
            <Route path='/signup'
              render={ ({history}) => (
                this.props.auth.loggedIn ? <Redirect to='/' /> : <SignupForm history={history}/>
              )}
            />
            <Route path='/logout' render={() => <Redirect to='/' />}/>
          </Switch>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {auth: state.auth}
}

export default connect(mapStateToProps, {getCurrentUser})(App);
