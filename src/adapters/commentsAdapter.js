import headers from './headers'

const ROOT_URL = process.env.REACT_APP_API_URL

class CommentsAdapter {

  static createComment(projectId, commentData) {
    return fetch(`${ROOT_URL}/projects/${projectId}/comments`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(commentData)
    }).then(resp => resp.json())
  }

  static getComments(projectId) {
    return fetch(`${ROOT_URL}/projects/${projectId}/comments`, {
      method: 'GET',
      headers: headers(),
    }).then(resp => resp.json())
  }

}

export default CommentsAdapter
