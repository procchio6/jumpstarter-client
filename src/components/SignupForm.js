import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Card, Form, Grid, Icon, Message } from 'semantic-ui-react'

import { signupUser, clearSignupErrors } from '../actions/authActions'

class SignupForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
    }
  }

  componentWillUnmount() {
    this.props.clearSignupErrors()
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSignup = (event) => {
    event.preventDefault()
    this.props.signupUser(this.state)
  }

  render() {
    return (
      <Grid centered>
        <Grid.Column mobile={12} tablet={8} computer={6} largeScreen={5} >
          <Card fluid>
            {this.props.errors.length > 0 ?
              <Message list={this.props.errors} error attached /> : null
            }
            <Card.Content>
              <Form onSubmit={this.handleSignup}>
                <Form.Field>
                  <label>First Name</label>
                  <input
                    name='first_name'
                    placeholder='First Name'
                    value={this.state.first_name}
                    onChange={this.handleInputChange}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Last Name</label>
                  <input
                    name='last_name'
                    placeholder='Last Name'
                    value={this.state.last_name}
                    onChange={this.handleInputChange}
                  />
                </Form.Field>
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
                  <label>Email</label>
                  <input
                    name='email'
                    type='email'
                    placeholder='Email'
                    value={this.state.email}
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
                  loading={this.props.signingUp}
                >
                  <Icon name='signup'/>
                  Signup
                </Button>
                <Button
                  type='button'
                  content='Login'
                  onClick={(e)=>this.props.history.push('/login')}
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
  return {...state.signupForm}
}

export default connect(mapStateToProps, {signupUser, clearSignupErrors})(SignupForm)
