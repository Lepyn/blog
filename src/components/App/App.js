import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import styles from './App.module.scss'
import PostList from '../PostList/PostList'
import { Routes, Route, Link } from 'react-router-dom'
import CreateAccount from '../modalWindows/CreateAccount/CreateAccount'
import CreateNewPost from '../modalWindows/CreateNewPost/CreateNewPost'
import LoginAccount from '../modalWindows/AutAccount/AuthAccount'
import EditPost from '../modalWindows/EditPost/EditPost'
import FullPost from '../modalWindows/FullPost/FullPost'
import Layout from '../Layout/Layout'
import EditAccount from '../modalWindows/EditAccount/EditAccount'
import { fetchHoldUserAfterUpdate } from '../../redux/blogSlice/userSlice'

const App = () => {
  const dispatch = useDispatch()

  const refreshPage = () => {
    if (localStorage.getItem('token')) {
      dispatch(fetchHoldUserAfterUpdate())
    } else {
      return
    }
  }
  useEffect(() => {
    refreshPage()
  }, [])
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostList />} />
        <Route index path="articles" element={<PostList />} />
        <Route path="articles/:slug" element={<FullPost />} />
        <Route path="sign-in" element={<LoginAccount />} />
        <Route path="sign-up" element={<CreateAccount />} />
        <Route path="profile" element={<EditAccount />} />
      </Route>
    </Routes>
  )
}

export default App