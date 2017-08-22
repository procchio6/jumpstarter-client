import React, { Component } from 'react'
import { Segment, Comment, Dimmer, Loader, Input, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import moment from 'moment'

import { getComments } from '../actions/projectActions'
import { createComment } from '../actions/commentActions'

class CommentPanel extends Component {

  state = {
    loading: true,
    newComment: '',
    submittingComment: false
  }

  componentDidMount() {
    const projectId = this.props.match.params.id
    this.props.getComments(projectId).then(() => this.setState({loading: false}))
  }

  handleCommentSubmit = (e) => {
    const {newComment} = this.state
    const projectId = this.props.match.params.id

    e.preventDefault()

    if (newComment.trim().length === 0) {
      alert('Comment cannot be blank!')
      this.setState({newComment: ''})
    } else {
      this.setState({submittingComment: true})
      this.props.createComment(projectId, {content: newComment.trim()})
      .then(() => {
        this.setState({submittingComment: false})
        this.props.getComments(projectId)
      })
      this.setState({newComment: ''})
    }
  }

  render() {
    const comments = this.props.comments.map( (comment) => (
      <ProjectComment key={comment.id} {...comment} />
    ))

    return (
      <Dimmer.Dimmable as={Segment} dimmed={this.state.loading} attached='bottom' padded='very'>
        <Dimmer active={this.state.loading} inverted>
          <Loader />
        </Dimmer>
        <Form onSubmit={this.handleCommentSubmit}>
          <Input fluid
            action={{
              color: 'green',
              content: 'Submit',
              type: 'submit',
              loading: this.state.submittingComment,
              disabled: !this.props.loggedIn
            }}
            value={this.state.newComment}
            onChange={(e) => this.setState({newComment: e.target.value})}
            disabled={!this.props.loggedIn}
          />
        </Form>
        <Comment.Group className='commentPanel panel'>
          {comments.length > 0 ? comments : <strong>No comments have been posted!</strong>}
        </Comment.Group>
      </Dimmer.Dimmable>
    )
  }
}

function ProjectComment({content, user, created_at}) {
  const timeAgo = moment(created_at).fromNow()

  return (
    <Comment>
      <Comment.Avatar src={user.avatar.url} />
      <Comment.Content>
        <Comment.Author as='span'>{`${user.first_name} ${user.last_name}`}</Comment.Author>
        <Comment.Metadata>
          <div>{timeAgo}</div>
        </Comment.Metadata>
        <Comment.Text>
          {content}
        </Comment.Text>
      </Comment.Content>
    </Comment>
  )
}

function mapStateToProps(state) {
  return {
    comments: state.projects.currentProject.comments,
    loggedIn: state.auth.loggedIn
  }
}

export default connect(mapStateToProps, { getComments, createComment })(CommentPanel)
