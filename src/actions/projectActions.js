import ProjectAdapter from '../adapters/projectsAdapter'
import CommentsAdapter from '../adapters/commentsAdapter'
import history from '../history'
import parse from 'parse-link-header'

export function getProjects(page) {
  return function (dispatch) {
    dispatch({type: 'GETTING_PROJECTS'})

    ProjectAdapter.getProjects(page)
    .then(resp => {
      const paginationLinks = parse(resp.headers.get('Link'))
      const total = resp.headers.get('Total')
      const perPage = resp.headers.get('Per-Page')

      dispatch({type: 'PROJECT_PAGINATION', payload: {total, perPage, ...paginationLinks}})
      return resp.json()
    })
    .then(projects => {
      if (projects.errors) {
        dispatch({type: 'GETTING_PROJECTS_FAILED', payload: projects.errors})
      } else {
        dispatch({type: 'LOAD_PROJECTS', payload: projects})
      }
    })
  }
}

export function createProject(formData) {
  return function (dispatch) {
    const fund_by_date = formData.fund_by_date.format('YYYY-MM-DD')
    const postBody = {...formData, fund_by_date}

    dispatch({type:'CREATING_PROJECT'})

    ProjectAdapter.createProject(postBody)
    .then(project => {
      if (project.errors) {
        dispatch({type: 'CREATE_PROJECT_FAILED', payload: project.errors})
      } else {
        dispatch({type: 'PROJECT_CREATED', payload: project})
        history.push(`/projects/${project.id}`)
      }
    })
  }
}

export function getProject(projectId) {
  return function (dispatch) {
    dispatch({type: 'GETTING_PROJECT', payload: projectId})
    return ProjectAdapter.getProject(projectId)
    .then(project => {
      if (project.error) {
        dispatch({type: 'GET_PROJECT_FAILED', payload: project.error})
        history.push('/')
      } else {
        dispatch({type: 'LOAD_PROJECT', payload: project})
      }
    })
  }
}

export function getBackers(projectId) {
  return function (dispatch) {
    dispatch({type: 'GETTING_BACKERS', payload: {projectId}})
    ProjectAdapter.getBackers(projectId)
    .then(backers => {
      if (backers.error) {
        dispatch({type: 'GET_BACKERS_FAILED', payload: backers.error})
      } else {
        dispatch({type: 'LOAD_BACKERS', payload: backers})
      }
    })
  }
}

export function getPledges(projectId) {
  return function (dispatch) {
    dispatch({type: 'GETTING_PLEDGES', payload: {projectId}})
    return ProjectAdapter.getPledges(projectId)
    .then(pledges => {
      if (pledges.error) {
        dispatch({type: 'GET_PLEDGES_FAILED', payload: pledges.error})
      } else {
        dispatch({type: 'LOAD_PLEDGES', payload: pledges})
      }
    })
  }
}

export function getComments(projectId) {
  return function (dispatch) {
    dispatch({type: 'GETTING_COMMENTS', payload: {projectId}})
    return CommentsAdapter.getComments(projectId)
    .then(comments => {
      if (comments.error) {
        dispatch({type: 'GET_COMMENTS_FAILED', payload: comments.error})
      } else {
        dispatch({type: 'LOAD_COMMENTS', payload: comments})
      }
    })
  }
}

export function getBackedProjects(userId) {
  return function (dispatch) {
    dispatch({type: 'GETTING_USER_BACKED_PROJECTS', payload: {userId}})
    return ProjectAdapter.getBackedProjects(userId)
    .then(resp => resp.json())
    .then(projects => {
      if (projects.error) {
        dispatch({type: 'GET_USER_BACKED_PROJECTS_FAILED', payload: projects.error})
      } else {
        dispatch({type: 'LOAD_USER_BACKED_PROJECTS', payload: projects})
      }
    })
  }
}

export function getUserProjects(userId) {
  return function (dispatch) {
    dispatch({type: 'GETTING_USERS_PROJECTS', payload: {userId}})
    return ProjectAdapter.getUserProjects(userId)
    .then(resp => resp.json())
    .then(projects => {
      if (projects.error) {
        dispatch({type: 'GET_USERS_PROJECTS_FAILED', payload: projects.error})
      } else {
        dispatch({type: 'LOAD_USERS_PROJECTS', payload: projects})
      }
    })
  }
}

export function clearErrors() {
  return {type: 'CLEAR_PROJECT_ERRORS'}
}
