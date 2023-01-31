import { useLocation, useNavigate, useParams } from 'react-router'
import styles from './EditPost.module.scss'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchEditOwnArticle } from '../../../redux/blogSlice/articlesSlice'

const EditPost = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [tags, setTags] = useState([''])
  const { key, title, description, tagList, body } = location.state
  const { editPost, status, error } = useSelector((state) => state.posts)
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  })

  const handleAddBtn = () => {
    setTags([...tags, ''])
  }

  const handleDeleteBtn = (index) => {
    const list = [...tags]
    list.splice(index)
    setTags(list)
  }

  const handleTagChange = (e, index) => {
    let { value } = e.target
    let list = [...tags]
    list[index] = value
    setTags(list)
  }

  const onSubmit = (data) => {
    const isValidData = {
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
      },
    }
    dispatch(fetchEditOwnArticle(key, isValidData))
    reset()
  }

  useEffect(() => {
    if (editPost) {
      reset()
      navigate('/', { replace: true })
    }
    reset()
  }, [editPost])

  return (
    <div className={styles.containerNewPost}>
      {status === 'Error' ? <div>{error}</div> : ''}
      <span className={styles.title}>Edit Post </span>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.aboutArticle}>
        <label className={styles.label}>
          <span className={styles.labelSpan}>Title</span>
          <input
            className={styles.input}
            defaultValue={title}
            {...register('title', {
              // required: 'Поле обязательно для заполнения',
              maxLength: { value: 1000, message: 'Максимум 1000 символов' },
              minLength: { value: 3, message: 'Минимум 3 символа' },
            })}
          ></input>
        </label>
        <label className={styles.label}>
          <span className={styles.labelSpan}>Description</span>
          <input
            className={styles.input}
            defaultValue={description}
            {...register('description', {
              // required: 'Поле обязательно для заполнения',
              maxLength: { value: 3000, message: 'Максимум 3000 символов' },
              minLength: { value: 3, message: 'Минимум 3 символа' },
            })}
          ></input>
        </label>
        <label className={styles.label}>
          <span className={styles.labelSpan}>Text</span>
          <input
            className={styles.inputText}
            defaultValue={body}
            {...register('body', {
              // required: 'Поле обязательно для заполнения',
              maxLength: { value: 3000, message: 'Максимум 3000 символов' },
              minLength: { value: 3, message: 'Минимум 3 символа' },
            })}
          ></input>
        </label>
        <span className={styles.labelSpan}>Tags</span>
        <label className={styles.wrapperTag}>
          {tags.map((btn, index) => (
            <>
              <div key={index}>
                <input
                  type="text"
                  // defaultValue={tagList}
                  placeholder="Tag"
                  value={tagList || btn}
                  className={styles.inputTag}
                  onChange={(e) => handleTagChange(e, index)}
                  // {...register('tag', {
                  //   required: false,
                  //   maxLength: { value: 3000, message: 'Максимум 3000 символов' },
                  //   minLength: { value: 3, message: 'Минимум 3 символа' },
                  // })}
                ></input>
                <button type="button" className={styles.wrapperBtnDel} onClick={() => handleDeleteBtn(index)}>
                  Delete
                </button>
              </div>
            </>
          ))}
          <button type="button" className={styles.wrapperBtnAdd} onClick={handleAddBtn}>
            Add tag
          </button>
        </label>
        <button type="submit" className={styles.send}>
          Send
        </button>
      </form>
    </div>
  )
}
export default EditPost
