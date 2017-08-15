export default function newProjectFormReducer(state={errors: [], creatingProject: false}, action) {
  switch (action.type) {
    case "CREATING_PROJECT":
      return {...state, creatingProject: true}
    case "CREATE_PROJECT_FAILED":
      return {...state, errors: [...action.payload], creatingProject: false}
    case "CLEAR_PROJECT_ERRORS":
      return {...state, errors: []}
    case "PROJECT_CREATED":
      return {...state, creatingProject: false, errors: []}
    default:
      return state
  }
}
