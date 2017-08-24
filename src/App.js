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
import ProjectShowContainer from './containers/ProjectShowContainer'
import SignupForm from './components/SignupForm'
import UserContainer from './containers/UserContainer'
import EditProject from './components/EditProject'

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
            <Route exact path='/' render={(props) => <Home {...props}/>} />

            <Route path='/projects/new' render={(props) => Authorize(NewProjectForm, props)} />
            <Route path='/projects/:id/edit' render={(props) => Authorize(EditProject, props)} />
            <Route path='/projects/:id' component={ProjectShowContainer} />

            <Route path='/users/:id' component={UserContainer} />

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
            <Route path='/*' render={() => <Redirect to='/' />}/>
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
