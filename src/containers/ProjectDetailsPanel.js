import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import ProjectDetailsMenu from '../components/ProjectDetailsMenu'
import CampaignPanel from '../components/CampaignPanel'
import FaqPanel from '../components/FaqPanel'
import CommentPanel from '../components/CommentPanel'
import BackersPanel from '../components/BackersPanel'


export default class ProjectDetailsPanel extends Component {

  render() {
    const { project } = this.props

    return (
      <div style={{marginTop: '14px'}}>
        <Route path='/projects/:id' component={ProjectDetailsMenu} />

        <Route exact path='/projects/:id' render={() => (
          <CampaignPanel content={project.campaign_content}/>
        )}/>

        <Route path='/projects/:id/faq' component={FaqPanel}/>
        <Route path='/projects/:id/comments' component={CommentPanel}/>
        <Route path='/projects/:id/backers' component={BackersPanel}/>
      </div>
    )
  }
}
