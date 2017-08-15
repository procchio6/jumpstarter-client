import AuthAdapter from '../adapters/authAdapter'

export function signupUser(formData) {
  return function (dispatch) {
    dispatch({type: 'SIGNING_UP'})
    AuthAdapter.signUp(formData)
    .then(resp => {
      if (resp.errors) {
        dispatch({type: 'SIGNUP_FAILED', payload: resp.errors})
      } else {
        dispatch({type: 'USER_CREATED', payload: resp})
        dispatch({type: 'LOGIN_USER', payload: resp})
        window.localStorage.setItem('token', resp.token)
      }
    })
  }
}

export function loginUser(formData) {
  return function (dispatch) {
    dispatch({type: 'LOGGING_IN'})
    AuthAdapter.login(formData)
    .then(resp => {
      if (resp.error) {
        dispatch({type: 'LOGIN_FAILED', payload: resp.error})
      } else {
        dispatch({type: 'LOGIN_USER', payload: resp})
        window.localStorage.setItem('token', resp.token)
      }
    })
  }
}

export function logoutUser() {
  return function (dispatch) {
    window.localStorage.clear()
    dispatch({type: 'LOGOUT_USER'})
  }
}

export function getCurrentUser() {
  return function (dispatch) {
    AuthAdapter.currentUser()
    .then( (resp) => {
      if (!resp.error) {
        dispatch({type: 'SET_CURRENT_USER', payload: resp})
      }
    })
  }
}

export function clearErrors() {
  return {type: 'CLEAR_LOGIN_ERRORS'}
}

export function clearSignupErrors() {
  return {type: 'CLEAR_SIGNUP_ERRORS'}
}
