import styles from './CreateNewPost.module.scss'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchGetNewArticle } from '../../../redux/blogSlice/articlesSlice'
import { useNavigate } from 'react-router-dom'
const CreateNewPost = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: 'onBlur',
  })
  const [tags, setTags] = useState([''])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { sendPost } = useSelector((state) => state.posts)

  useEffect(() => {
    if (sendPost) {
      navigate('/', { replace: true })
    }
    reset()
  }, [sendPost])

  const handleAddBtn = () => {
    setTags([...tags, ''])
  }

  const handleDeleteBtn = (index) => {
    const list = [...tags]
    list.splice(index, 1)
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
        tagList: tags.filter((tag) => tag), // сравниваю наличие пустых тегов
      },
    }
    dispatch(fetchGetNewArticle(isValidData))
    reset()
  }

  return (
    <div className={styles.containerNewPost}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.aboutArticle}>
        <label className={styles.label}>
          <span className={styles.labelSpan}> Title</span>
          <input
            className={styles.input}
            type="text"
            placeholder="Title"
            {...register('title', {
              required: 'Поле обязательно для заполнения',
              maxLength: { value: 50, message: 'Максимум 50 символов' },
              minLength: { value: 3, message: 'Минимум 3 символа' },
            })}
          ></input>
          <div className={styles.error}>{errors?.title && <p>{errors?.title?.message || 'Error!'}</p>}</div>
        </label>
        <label className={styles.label}>
          <span className={styles.labelSpan}>Short description</span>
          <input
            // id="inputTitle"
            className={styles.input}
            type="text"
            placeholder="Title"
            {...register('description', {
              required: 'Поле обязательно для заполнения',
              maxLength: { value: 300, message: 'Максимум 300 символов' },
              minLength: { value: 3, message: 'Минимум 3 символа' },
            })}
          ></input>
          <div className={styles.error}>{errors?.description && <p>{errors?.description?.message || 'Error!'}</p>}</div>
        </label>
        <label className={styles.label}>
          <span className={styles.labelSpan}>Text</span>
          <input
            className={styles.inputText}
            type="text"
            placeholder="Text"
            {...register('body', {
              required: 'Поле обязательно для заполнения',
              maxLength: { value: 1000, message: 'Максимум 1000 символов' },
              minLength: { value: 3, message: 'Минимум 3 символа' },
            })}
          ></input>
          <div className={styles.error}>{errors?.body && <p>{errors?.body?.message || 'Error!'}</p>}</div>
        </label>
        {/* <span className={styles.labelSpan}> </span> */}
        <label className={styles.wrapperTag}>
          Tags
          {tags.map((btn, index) => (
            <div className={styles.wrapperSend} key={index}>
              <input
                type="text"
                placeholder="Tag"
                value={btn}
                className={styles.inputTag}
                onChange={(e) => handleTagChange(e, index)}
                // {...register('tag', {
                //   required: false,
                //   maxLength: { value: 3000, message: 'Максимум 3000 символов' },
                //   minLength: { value: 3, message: 'Минимум 3 символа' },
                // })}
              />
              {tags.length > 1 && (
                <button type="button" className={styles.wrapperBtnDel} onClick={() => handleDeleteBtn(index)}>
                  Delete
                </button>
              )}
              {tags.length - 1 === index && tags.length < 4 && (
                <button type="button" className={styles.wrapperBtnAdd} onClick={handleAddBtn}>
                  Add tag
                </button>
              )}
            </div>
          ))}
        </label>
        <button type="submit" className={styles.send} disabled={!isValid}>
          Send
        </button>
      </form>
    </div>
  )
}
export default CreateNewPost
