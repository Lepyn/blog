import styles from './FullPost.module.scss'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useParams, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchFullArticle } from '../../../redux/blogSlice/articlesSlice'
import ReactMarkdown from 'react-markdown'

const FullPost = () => {
  const { slug } = useParams()
  const {
    posts: { articles },
  } = useSelector((state) => state.posts)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFullArticle(slug))
  }, [dispatch, slug])

  const location = useLocation()
  const { author, title, description, createdAt, favoritesCount, tagList, body } = location.state

  const formatData = (data) => {
    if (!data) return null
    return format(new Date(data), 'MMMM d, yyyy')
  }

  console.log(slug, 'sehdrjfkyghulij;okplESHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH')

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContainer}>
        <div className={styles.postInfo}>
          <div className={styles.postArticle}>
            <span className={styles.title}>{title} </span>
            <button className={styles.like}></button>
            <div className={styles.countLike}>{favoritesCount}</div>
          </div>
          <div className={styles.tag}>{tagList}</div>
          <span className={styles.shortDescription}>{description}</span>
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userWrapInfo}>
            <div className={styles.userName}> {author.username}</div>
            <div className={styles.datePost}> {formatData(createdAt)}</div>
          </div>
          <img className={styles.userAvatar} src={author.image} />
        </div>
      </div>

      <div className={styles.description}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  )
}

export default FullPost
