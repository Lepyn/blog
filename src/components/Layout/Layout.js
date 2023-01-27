import styles from './Layout.module.scss'
import { Link, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateLogout } from '../../redux/blogSlice/userSlice'
import avatar from '../../img/avatar.png'

const Layout = () => {
  const dispatch = useDispatch()
  const { isAuth } = useSelector((state) => state.user)
  const { username, image } = useSelector((state) => state.user.user)
  // console.log(isAuth, 'isAuth LAYOUT')

  return (
    <>
      <header className={styles.containerHeader}>
        <Link to="/">ГОЛОВА НАХУЙ</Link>
        {!isAuth ? (
          <div className={styles.containerBtn}>
            <Link to="/sign-in" className={styles.signInBtn}>
              sign-in
            </Link>
            <Link to="/sign-up" className={styles.signUpBtn}>
              sign-up
            </Link>
          </div>
        ) : (
          <div className={styles.containerProfile}>
            <button className={styles.createArticle}>createArticle</button>
            <Link to="/profile" className={styles.headerAuth}>
              <span className={styles.userName}>{username}</span>
              <img className={styles.imgProfile} src={image || avatar} />
            </Link>
            <Link to="/" onClick={() => dispatch(updateLogout())} className={styles.logOut}>
              Log out
            </Link>
          </div>
        )}
      </header>
      <div className={styles.app}>
        <main className={styles.containerMain}>
          <Outlet />
        </main>
      </div>
    </>
  )
}

export default Layout
