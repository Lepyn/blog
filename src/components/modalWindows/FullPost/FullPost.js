import styles from './FullPost.module.scss'
import { format } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { fetchFullArticle, fetchDeleteOwnArticle, updatePageAfterDel } from '../../../redux/blogSlice/articlesSlice'
import ReactMarkdown from 'react-markdown'
import { message, Popconfirm } from 'antd'

const FullPost = () => {
  const location = useLocation()
  const { author, title, description, createdAt, favoritesCount, tagList, body } = location.state
  const navigate = useNavigate()
  const { slug } = useParams()
  const dispatch = useDispatch()

  // const {
  //   posts: { articles },
  // } = useSelector((state) => state.posts)
  const { username } = useSelector((state) => state.user.user)

  useEffect(() => {
    dispatch(fetchFullArticle(slug))
  }, [dispatch, slug])

  const formatData = (data) => {
    if (!data) return null
    return format(new Date(data), 'MMMM d, yyyy')
  }

  const confirm = (e) => {
    message.success('Пост удален')
    dispatch(fetchDeleteOwnArticle(slug))
    // console.log(slug)
    navigate('/', { replace: true })
  }
  const cancel = (e) => {
    message.error('Отмена удаления поста')
  }

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
            <div>
              <div className={styles.userName}> {author.username}</div>
              <div className={styles.datePost}> {formatData(createdAt)}</div>
            </div>
            <img className={styles.userAvatar} src={author.image} />
          </div>
          <div className={styles.wrapForBtn}>
            {author.username === username && (
              <>
                <Popconfirm
                  title="Удаление поста"
                  description="Вы уверены, что хотите удалить пост?"
                  onConfirm={confirm}
                  onCancel={cancel}
                  okText="Да"
                  cancelText="Нет"
                >
                  <button type="submit" className={styles.deleteBtn}>
                    Delete
                  </button>
                </Popconfirm>
                <Link
                  to="/edit"
                  className={styles.editBtn}
                  state={{
                    key: slug,
                    author: author,
                    title: title,
                    description: description,
                    createdAt: createdAt,
                    favoritesCount: favoritesCount,
                    tagList: tagList,
                    body: body,
                  }}
                >
                  Edit
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className={styles.description}>
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  )
}

export default FullPost
