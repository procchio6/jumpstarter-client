import ProjectAdapter from '../adapters/projectsAdapter'
import history from '../history'

export function getProjects() {
  return function (dispatch) {
    dispatch({type: 'GETTING_PROJECTS'})

    ProjectAdapter.getProjects()
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
    ProjectAdapter.getProject(projectId)
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
    ProjectAdapter.getPledges(projectId)
    .then(pledges => {
      if (pledges.error) {
        dispatch({type: 'GET_PLEDGES_FAILED', payload: pledges.error})
      } else {
        dispatch({type: 'LOAD_PLEDGES', payload: pledges})
      }
    })
  }
}

export function clearErrors() {
  return {type: 'CLEAR_PROJECT_ERRORS'}
}
