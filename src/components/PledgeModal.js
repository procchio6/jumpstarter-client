import React, { Component } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import accounting from 'accounting'

class PledgeModal extends Component {
  render() {
    const pledgeAmount = accounting.formatMoney(this.props.amount, '$', 0)

    return (
      <Modal trigger={this.props.trigger} size='mini' open={this.props.open}>

        <Modal.Header>Confirm pledge of {pledgeAmount}?</Modal.Header>

        <Modal.Actions>
          <Button positive onClick={this.props.onConfirmPledge}>Yes</Button>
          <Button negative onClick={this.props.handleClose}>No</Button>
        </Modal.Actions>

      </Modal>
    )
  }
}

export default PledgeModal
