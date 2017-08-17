export default function projectsReducer(
  state = {
    currentProject: {
      pledges:[],
      comments:[]
    },
    list:[],
    pagination: {}
  }, action) {

  switch (action.type) {
    case "LOAD_PROJECT":
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          ...action.payload
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

    case "LOAD_COMMENTS":
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          comments: action.payload
        }
      }

    case "PLEDGE_CREATED":
      return {
        ...state,
        currentProject: {
          ...state.currentProject,
          comments: [action.payload, ...state.currentProject.comments]
        }
      }

    case "PROJECT_PAGINATION":
      return {
        ...state,
        pagination: action.payload
      }

    default:
      return state
  }
}
