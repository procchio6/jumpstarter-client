export default function authReducer(
  state = {
    loggedIn: false,
    currentUser: {},
    errors: [],
    loggingIn: false
  }, action) {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        ...state,
        loggedIn: true,
        loggingIn: false,
        currentUser: {
          id: action.payload.id,
          username: action.payload.username
        }
      }
    case "LOGOUT_USER":
      return {
        ...state,
        loggedIn: false,
        currentUser: {}
      }
    case "LOGIN_FAILED":
      return {
        ...state,
        loggingIn: false,
        errors:[action.payload]
      }
    case "LOGGING_IN":
      return {
        ...state,
        loggingIn: true,
        errors:[]
      }
    case "CLEAR_LOGIN_ERRORS":
      return {
        ...state,
        errors:[]
      }
    case "SET_CURRENT_USER":
      return {
        ...state,
        loggedIn: true,
        currentUser: {
          id: action.payload.id,
          username: action.payload.username
        }
      }
    default:
      return state
  }
}
