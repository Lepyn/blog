import styles from './PostItem.module.scss'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchFullArticle, fetchLikeArticle } from '../../redux/blogSlice/articlesSlice'
// import avatar from '../../img/'
const PostItem = (props) => {
  let { author, title, description, createdAt, favoritesCount, tagList, body, slug, favorited } = props
  console.log(favorited, 'после пропса до ЮзЭффекта')
  const [like, setLike] = useState(favorited)
  const [count, setCount] = useState(favoritesCount)

  const {
    error,
    status,
    // likeCount,
    posts: { articles, articlesCount },
  } = useSelector((state) => state.posts)
  //

  const { isAuth, isReg } = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const formatData = (data) => {
    if (!data) return null
    return format(new Date(data), 'MMMM d, yyyy')
  }

  // useEffect(() => {
  //   if (slug) {
  //     dispatch(fetchFullArticle(slug))
  //   }
  //   if (favorited || !favorited) {
  //     console.log(favorited, 'в юзэффекте до сета')
  //     setLike(favorited)
  //     console.log(favorited, 'в юзэффекте после сета')
  //   }
  //   setCount(favoritesCount)
  // }, [slug, favorited, favoritesCount])

  // useEffect(() => {
  //   dispatch(fetchFullArticle(slug))
  //   if (favoritesCount || !favoritesCount) {
  //     setLike(favorited)
  //   }
  //   setCount(favoritesCount)
  // }, [slug, favorited, favoritesCount])

  // const handleLike = () => {
  //   setLike(!like)
  //   setCount(like ? count - 1 : count + 1)
  //   dispatch(fetchLikeArticle([like, slug]))
  // }

  return (
    <>
      <li className={styles.itemWrapper}>
        <div className={styles.postInfo}>
          <div className={styles.postArticle}>
            <Link
              to={`/articles/${slug}`}
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
              className={styles.title}
            >
              {title?.length > 35 ? `${title.slice(0, 35)}…` : title}
            </Link>
            <button
              className={styles.like}
              onClick={() => {
                setLike(!like)
                setCount(like ? count - 1 : count + 1)
                dispatch(fetchLikeArticle([like, slug]))
              }}
            >
              {like && isAuth ? (
                <HeartFilled style={{ cursor: 'pointer', marginRight: '5px', fontSize: '16px', color: 'red' }} />
              ) : (
                <HeartOutlined
                  style={{
                    cursor: 'pointer',
                    marginRight: '5px',
                    fontSize: '16px',
                    color: 'rgba(0, 0, 0, .75)',
                  }}
                />
              )}
            </button>
            <span className={styles.countLike}>{count}</span>
          </div>
          <ul style={tagList.length ? { display: 'flex' } : { display: 'none' }}>
            {tagList.map((tag, index) => (
              <li className={styles.tag} key={index}>
                {tag?.length > 35 ? `${tag.slice(0, 35)}…` : tag}
              </li>
            ))}
          </ul>
          <span className={styles.description}>{description?.length > 100 ? `${description.slice(0, 100)}…` : description}</span>
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userWrapInfo}>
            <div className={styles.userName}>{author.username}</div>
            <p className={styles.datePost}>{formatData(createdAt)}</p>
          </div>
          <img className={styles.userAvatar} src={author?.image} />
        </div>
      </li>
    </>
  )
}
export default PostItem
