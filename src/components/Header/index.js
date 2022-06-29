import {Link, withRouter} from 'react-router-dom'
import {IoIosLogOut} from 'react-icons/io'
import {HiHome} from 'react-icons/hi'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link to="/">
          <img
            className="header-website-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>
        <ul className="nav-menu desktop-nav-menu">
          <Link to="/" className="nav-link">
            <li>Home</li>
          </Link>
          <Link to="/jobs" className="nav-link">
            <li>Jobs</li>
          </Link>
        </ul>
        <button
          type="button"
          className="logout-desktop-btn"
          onClick={onClickLogout}
        >
          Logout
        </button>
        <div className="mobile-container">
          <ul className="nav-menu">
            <Link to="/" className="nav-link">
              <li>
                <HiHome fontSize="2em" color="#f8fafc" />
              </li>
            </Link>
            <Link to="/jobs" className="nav-link">
              <li>
                <BsFillBriefcaseFill color="#f8fafc" fontSize="2em" />
              </li>
            </Link>
          </ul>
          <button
            type="button"
            className="logout-mobile-btn"
            onClick={onClickLogout}
          >
            <IoIosLogOut color="#f8fafc" fontSize="2em" />
          </button>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(Header)
