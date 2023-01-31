import styles from './PostItem.module.scss'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
// import FullPost from '../modalWindows/FullPost/FullPost'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchFullArticle, fetchLikeForArticleAdd, fetchLikeForArticleRemove } from '../../redux/blogSlice/articlesSlice'

const PostItem = (props) => {
  let { author, title, description, createdAt, favoritesCount, tagList, body, slug, favorited } = props

  let [like, setLike] = useState(favoritesCount)

  const {
    error,
    status,
    likeCount,
    posts: { articles, articlesCount },
  } = useSelector((state) => state.posts)

  const { isIn, isReg } = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const formatData = (data) => {
    if (!data) return null
    return format(new Date(data), 'MMMM d, yyyy')
  }

  const handleLike = (e) => {
    if (!likeCount) {
      dispatch(fetchLikeForArticleAdd(slug))
      setLike(like + 1)
    } else {
      dispatch(fetchLikeForArticleRemove(slug))
      setLike(like - 1)
    }
  }

  useEffect(() => {
    dispatch(fetchFullArticle(slug))
  }, [slug])

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
              {title}
            </Link>
            <button className={styles.like} onClick={handleLike}></button>
            <span className={styles.countLike}>{like}</span>
          </div>
          {tagList.length === 0 ? '' : <div className={styles.tag}>{tagList}</div>}
          <span className={styles.description}>{description}</span>
        </div>
        <div className={styles.userInfo}>
          <div className={styles.userWrapInfo}>
            <div className={styles.userName}>{author.username}</div>
            <p className={styles.datePost}>{formatData(createdAt)}</p>
          </div>
          <img className={styles.userAvatar} src={author.image} />
        </div>
      </li>
    </>
  )
}
export default PostItem
