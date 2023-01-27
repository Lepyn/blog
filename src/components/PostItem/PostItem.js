import styles from './PostItem.module.scss'
import { format } from 'date-fns'
import { Routes, Route, Link } from 'react-router-dom'
import FullPost from '../modalWindows/FullPost/FullPost'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { fetchFullArticle, updateSlug } from '../../redux/blogSlice/articlesSlice'

const PostItem = (props) => {
  const { author, title, description, createdAt, favoritesCount, tagList, body, slug } = props

  const {
    error,
    status,
    posts: { articles, articlesCount },
  } = useSelector((state) => state.posts)

  const dispatch = useDispatch()

  const formatData = (data) => {
    if (!data) return null
    return format(new Date(data), 'MMMM d, yyyy')
  }
  // useEffect(() => {
  //   // dispatch(updateSlug(slug))
  //   dispatch(fetchFullArticle(slug))
  // }, [])
  // console.log(props, 'props')

  // const emptyTag = ({ tagList }) => {
  //   return !tagList ? null : tagList
  // }
  return (
    <>
      {/* <Routes>
        <Route
          path={`/articles${slug}`}
          element={<FullPost author={author} title={title} description={description} createdAt={createdAt} favoritesCount={favoritesCount} tagList={tagList} />}
        />
      </Routes> */}
      <li className={styles.itemWrapper}>
        <div className={styles.postInfo}>
          <div className={styles.postArticle}>
            {/* {articles.map((post) => ( */}
            {/* <span key={post.slug}> */}
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
            {/* </span> */}
            {/* ))} */}
            <button className={styles.like}></button>
            <div className={styles.countLike}>{favoritesCount}</div>
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
