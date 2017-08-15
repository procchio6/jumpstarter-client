import headers from './headers'

const ROOT_URL = process.env.REACT_APP_API_URL

class ProjectsAdapter {
  static getProjects(option = '') {
    return fetch(`${ROOT_URL}/projects/${option}`, {
      headers: headers()
    }).then(resp => resp.json())
  }

  static getProject(projectId) {
    return fetch(`${ROOT_URL}/projects/${projectId}`, {
      headers: headers()
    }).then(resp => resp.json())
  }

  static createProject(project) {
    return fetch(`${ROOT_URL}/projects`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(project)
    }).then(resp => resp.json())
  }

  static updateProject(project) {
    return fetch(`${ROOT_URL}/projects/${project.id}`, {
      method: 'PATCH',
      headers: headers(),
      body: JSON.stringify(project)
    })
  }

  static deleteProject(projectID) {
    return fetch(`${ROOT_URL}/projects/${projectID}`, {method: 'DELETE', headers: headers()})
  }

  static getBackers(projectId) {
    return fetch(`${ROOT_URL}/projects/${projectId}/backers`, {
      method: 'GET',
      headers: headers()
    }).then(resp => resp.json())
  }

  static getPledges(projectId) {
    return fetch(`${ROOT_URL}/projects/${projectId}/pledges`, {
      method: 'GET',
      headers: headers()
    }).then(resp => resp.json())
  }
}

export default ProjectsAdapter
