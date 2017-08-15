import CategoryAdapter from '../adapters/categoriesAdapter'

export function getCategories() {
  return function (dispatch) {
    dispatch({type: 'GETTING_CATEGORIES'})
    CategoryAdapter.getCategories()
    .then(resp => {
      if (resp.error) {
        dispatch({type: 'FAILED_GET_CATEGORIES'})
      } else {
        dispatch({type: 'LOAD_CATEGORIES', payload:resp})
      }
    })
  }
}
