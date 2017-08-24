import React, { Component } from 'react'
import { Segment, Dimmer, Loader } from 'semantic-ui-react'
import { EditorState, convertFromRaw } from 'draft-js'
import Editor from 'draft-js-editor'

class CampaignPanel extends Component {

  parsedContent = () => JSON.parse(this.props.content)

  render() {
    const editorState = this.props.content ?
      EditorState.createWithContent(convertFromRaw(this.parsedContent())) : EditorState.createEmpty()

    return (
      <Dimmer.Dimmable as={Segment} dimmed={this.props.loading} attached='bottom' padded='very'>

        <Dimmer active={this.props.loading} inverted>
          <Loader />
        </Dimmer>
        
        <Editor
          placeholder="No campaign content!"
          editorState={editorState}
          readOnly
        />

      </Dimmer.Dimmable>
    )
  }
}

export default CampaignPanel
