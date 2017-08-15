import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Card, Form, Grid, Icon, Message } from 'semantic-ui-react'

import { loginUser, clearErrors } from '../actions/authActions'

class LoginForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
  }

  componentWillUnmount() {
    this.props.clearErrors()
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleLogin = (event) => {
    event.preventDefault()
    this.props.loginUser(this.state)
  }

  render() {
    return (
      <Grid centered>
        <Grid.Column mobile={12} tablet={8} computer={6} largeScreen={5} >
          <Card fluid>
            {this.props.auth.errors.length > 0 ?
              <Message content='Username or password is incorrect!' error attached /> : null
            }
            <Card.Content>
              <Form onSubmit={this.handleLogin}>
                <Form.Field>
                  <label>Username</label>
                  <input
                    name='username'
                    placeholder='Username'
                    value={this.state.username}
                    onChange={this.handleInputChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Password</label>
                  <input
                    name='password'
                    type='password'
                    placeholder='Password'
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
                </Form.Field>
                <Button
                  type='submit'
                  color='green'
                  loading={this.props.auth.loggingIn}
                >
                  <Icon name='unlock alternate'/>
                  Login
                </Button>
                <Button
                  type='button'
                  content='Signup'
                  onClick={(e)=>this.props.history.push('/signup')}
                />
              </Form>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {auth: state.auth}
}

export default connect(mapStateToProps, {loginUser, clearErrors})(LoginForm)
