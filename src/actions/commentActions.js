import CommentsAdapter from '../adapters/commentsAdapter'
import { getProject } from './projectActions'

export function createComment(projectId, commentData) {
  return function (dispatch) {

    dispatch({type:'CREATING_COMMENT', payload: commentData})

    return CommentsAdapter.createComment(projectId, commentData)
    .then(comment => {
      if (comment.errors) {
        dispatch({type: 'CREATE_COMMENT_FAILED', payload: comment.errors})
      } else {
        dispatch({type: 'COMMENT_CREATED', payload: comment})
      }
    })
  }
}
