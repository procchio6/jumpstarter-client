export default function selectedUserReducer(
  state = {
    backedProjects: [],
    createdProjects:[],
    info: {}
  }, action) {
  switch (action.type) {
    case 'LOAD_USERS_PROJECTS':
      return {
        ...state,
        createdProjects: action.payload
      }
    case 'LOAD_USER_BACKED_PROJECTS':
      return {
        ...state,
        backedProjects: action.payload
      }
    case 'SELECT_USER':
      return {
        ...state,
        info: action.payload
      }
    default:
      return state
  }
}
