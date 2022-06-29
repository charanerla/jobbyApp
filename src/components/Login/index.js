import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {userName: '', password: '', isErrorMsgShown: false, errorMessage: ''}

  onLoginSuccess = token => {
    Cookies.set('jwt_token', token, {expires: 20})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({isErrorMsgShown: true, errorMessage: errorMsg})
  }

  updateUserName = event => {
    const nameValue = event.target.value
    this.setState({userName: nameValue})
  }

  updatePassword = event => {
    const passwordValue = event.target.value
    this.setState({password: passwordValue})
  }

  onSubmittingTheForm = async event => {
    event.preventDefault()
    // console.log('in')
    const {userName, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username: userName, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      //   console.log(response)
      //   console.log(data)
      this.onLoginSuccess(data.jwt_token)
    } else {
      const data = await response.json()
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {userName, password, isErrorMsgShown, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <form className="login-form" onSubmit={this.onSubmittingTheForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <div className="form-body">
            <label htmlFor="username" className="login-labels">
              USERNAME
            </label>
            <input
              type="text"
              placeholder="username"
              id="username"
              value={userName}
              onChange={this.updateUserName}
              required
            />
            <label htmlFor="password" className="login-labels">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={this.updatePassword}
              required
            />
            <button type="submit" className="login-btn">
              Login
            </button>
            {isErrorMsgShown && (
              <p className="error-message">*{errorMessage}</p>
            )}
          </div>
        </form>
      </div>
    )
  }
}

export default Login
