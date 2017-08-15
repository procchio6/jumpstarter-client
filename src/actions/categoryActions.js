
export function getCategories() {
  return function (dispatch) {
    dispatch({type: 'GETTING_CATEGORIES'})
    fetch('http://localhost:3000/api/v1/categories')
    .then(resp => resp.json())
    .then(resp => {
      if (resp.error) {
        dispatch({type: 'FAILED_GET_CATEGORIES'})
      } else {
        dispatch({type: 'LOAD_CATEGORIES', payload:resp})
      }
    })
  }
}
