import headers from './headers'

const baseUrl = process.env.REACT_APP_API_URL

export default class AuthAdapter {
  static login (loginParams) {
    return fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(loginParams)
    }).then(res => res.json())
  }

  static signUp (signUpParams) {
    return fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(signUpParams)
    }).then(res => res.json())
  }

  static currentUser () {
    return fetch(`${baseUrl}/me`, {
      headers: headers()
    }).then(res => res.json())
  }
}
