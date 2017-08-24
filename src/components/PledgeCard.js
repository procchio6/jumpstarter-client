import React, { Component } from 'react'
import { Card, Form, Input, Button, Label } from 'semantic-ui-react'

import PledgeModal from './PledgeModal'

export default class PledgeCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      amount: 10,
      modalShown: false
    }
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleModalClose = (event) => this.setState({modalShown: false})

  handleModalOpen = (event) => {
    if (this.state.amount > 0 && this.state.amount <= 1000000) {
      this.setState({modalShown: true})
    } else {
      alert('Pledge must be between $1 - $1,000,000!')
    }
  }

  handlePledge = (event) => {
    const pledgeData = {amount: this.state.amount, project_id: this.props.projectId}
    this.props.onCreatePledge(pledgeData)
    .then(resp => {
      this.handleModalClose()
    })
  }

  render() {
    return (
      <Card>
        <Card.Content>
          <Form>
            <Form.Field>
              <Input fluid
                labelPosition='right'
                placeholder='Amount'
                name='amount'
                type='number'
                onChange={this.handleInputChange}
                value={this.state.amount}
                disabled={this.props.disabled}
                >
                  <Label basic>$</Label>
                  <input/>
                  <Label>.00</Label>
                </Input>
              </Form.Field>
              <Button fluid type='submit' content='Pledge' color='green'
                onClick={this.handleModalOpen}
                disabled={this.props.disabled}
              />
            </Form>
          </Card.Content>
          <PledgeModal
            amount={this.state.amount}
            handleClose={this.handleModalClose}
            open={this.state.modalShown}
            onConfirmPledge={this.handlePledge.bind(this)}
          />
        </Card>

    )
  }
}
