export default function signupFormReducer(state={signingUp: false, errors:[]}, action) {
  switch (action.type) {
    case "SIGNING_UP":
      return {
        ...state,
        signingUp: true
      }
    case "SIGNUP_FAILED":
      return {
        ...state,
        signingUp: false,
        errors: action.payload
      }
    case "USER_CREATED":
      return {
        ...state,
        signingUp: false,
        errors: []
      }
    case "CLEAR_SIGNUP_ERRORS":
      return {
        ...state,
        errors: []
      }
    default:
      return state
  }
}
