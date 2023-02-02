import styles from './PostItem.module.scss'
import { format } from 'date-fns'
import { Link, useLocation } from 'react-router-dom'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { message, Popconfirm, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchFullArticle, fetchLikeArticle } from '../../redux/blogSlice/articlesSlice'
// import avatar from '../../img/'
const PostItem = (props) => {
  let { author, title, description, createdAt, favoritesCount, tagList, body, slug, favorited } = props
  const location = useLocation()
  // let { author, title, description, createdAt, favoritesCount, tagList, body, slug, favorited } = location.state
  // console.log(favorited, 'после пропса до ЮзЭффекта')
  const [like, setLike] = useState(favorited)
  const [count, setCount] = useState(favoritesCount)

  // const {
  //   error,
  //   status,
  //   // likeCount,
  //   posts: { articles, articlesCount },
  // } = useSelector((state) => state.posts)
  //

  const { isAuth, isReg } = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const formatData = (data) => {
    if (!data) return null
    return format(new Date(data), 'MMMM d, yyyy')
  }

  const handleLike = () => {
    setLike(!like)
    setCount(like ? count - 1 : count + 1)
    dispatch(fetchLikeArticle([like, slug]))
  }

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
                favorited: favorited,
              }}
              className={styles.title}
            >
              {title?.length > 35 ? `${title.slice(0, 35)}…` : title}
            </Link>
            {isAuth || isReg ? (
              <Button className={styles.like} onClick={handleLike}>
                {like ? <HeartFilled style={{ color: '#FF0707' }} /> : <HeartOutlined />}
              </Button>
            ) : (
              <HeartOutlined style={{ marginLeft: '10px' }} />
            )}
            <span className={styles.countLike}>{count}</span>
          </div>
          {/* style={tagList.length ? { display: 'flex' } : { display: 'none' }} */}
          <ul className={styles.wrapTagList}>
            {tagList.map((tag, index) => (
              <li className={styles.tag} key={index}>
                {tag?.length > 6 ? `${tag.slice(0, 6)}` : tag}
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
