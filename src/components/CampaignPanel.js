import React, { Component } from 'react'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'
import { stateToHTML } from 'draft-js-export-html'
import { convertFromRaw } from 'draft-js'
import SafeHTML from 'react-safe-html'

class CampaignPanel extends Component {

  parsedContent = () => JSON.parse(this.props.content)

  render() {
    const campaignHTML = this.props.content ?
      stateToHTML(convertFromRaw(this.parsedContent())) : '<p> No campaign content! </p>'

    return (
      <Dimmer.Dimmable as={Segment} dimmed={this.props.loading} attached='bottom' padded='very'>
        <Dimmer active={this.props.loading} inverted>
          <Loader />
        </Dimmer>
        <SafeHTML html={campaignHTML} />
      </Dimmer.Dimmable>
    )
  }
}

export default CampaignPanel
