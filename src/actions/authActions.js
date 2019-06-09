import {URL, HEADERS} from '../constants'

export const auth = (info) => {
  return (dispatch) => {
    dispatch({type: 'START_LOADING'})
    // console.log(info)
    return fetch(`${URL}/auth`, {
      method: 'POST',
      headers: HEADERS(),
      body: JSON.stringify({
        user: {
          username_or_email: info.usernameOrEmail,
          password: info.password
        }
      })
    })
    .then(r => r.json())
    .then(jwtAndUser => {
      // debugger
      dispatch({type: 'STOP_LOADING'})
      if (jwtAndUser.user && jwtAndUser.jwt) {
        localStorage.setItem('token', jwtAndUser.jwt)
        dispatch({ type: 'SELECT_USER', payload: jwtAndUser})
      }
      else {
        debugger
      }
    })
  }
}

export const reauth = () => {
  return (dispatch) => {
    dispatch({type: 'START_LOADING'})
    return fetch(`${URL}/reauth`, {
      method: 'POST',
      headers: HEADERS()
    })
    .then(response => {
      return response.json()
    })
    .then(jwtAndUser => {
      console.log(jwtAndUser)
      dispatch({type: 'STOP_LOADING'})
      if (jwtAndUser.user && jwtAndUser.jwt) {
        // console.log(jwtAndUser)
        dispatch({ type: 'SELECT_USER', payload: jwtAndUser})
      }
    })
  }
}