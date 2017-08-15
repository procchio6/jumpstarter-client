import headers from './headers'

const ROOT_URL = process.env.REACT_APP_API_URL

class CategoryAdapter {

  // pledeData = {amount: num, project_id: int}
  static getCategories(pledgeData) {
    return fetch(`${ROOT_URL}/categories`)
    .then(resp => resp.json())
  }

}

export default CategoryAdapter
