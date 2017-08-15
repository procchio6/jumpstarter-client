export default function projectsReducer(state={currentProject: {pledges:[]}, list:[]}, action) {
  switch (action.type) {
    case "LOAD_PROJECT":
      return {
        ...state,
        currentProject: {
          ...action.payload,
          pledges: state.currentProject.pledges
        }
      }
    case "LOAD_PROJECTS":
      return {...state, list: action.payload}
    case "LOAD_PLEDGES":
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          pledges: action.payload
        }
      }
    case "PLEDGE_CREATED":
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          pledges: [action.payload, ...state.currentProject.pledges]
        }
      }
    default:
      return state
  }
}
