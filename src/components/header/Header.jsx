import React from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout} from '../redux/reducers/userSlice'
import style from './Header.module.scss'

const Header = () => {
    const dispatch = useDispatch()
    const {isAuthenticated, user} = useSelector(state => state.user)

    const handleLogout = () => {
        dispatch(logout())
    }

    return (
        <div className={style.main}>
            <div className={style.container}>
                <div className={style.logo}>
                    <Link to="/">Logo</Link>
                </div>
                <nav className={style.navigation}>
                    <Link to="/">Home</Link>
                    {!isAuthenticated ? (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Sign Up</Link>
                        </>
                    ) : (
                        <>
                            <span>Welcome, {user?.name}</span>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    )}
                </nav>
            </div>
        </div>
    )
}

export default Header