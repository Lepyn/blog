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
  const [buttons, setButtons] = useState([{ service: '' }])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { sendPost } = useSelector((state) => state.posts)

  useEffect(() => {
    if (sendPost) {
      navigate('/', { replace: true })
    }
    reset()
  }, [sendPost])

  const handleBtnAdd = () => {
    setButtons([...buttons, { service: '' }])
  }

  const handleBtnDelete = (index) => {
    const list = [...buttons]
    list.splice(index, 1)
    setButtons(list)
  }

  const handleChange = (e, index) => {
    const { name, value } = e.target
    const list = [...buttons]
    list[index][name] = value
    setButtons(list)
  }

  const onSubmit = (data) => {
    console.log(data)
    const isValidData = {
      article: {
        title: data.title,
        description: data.description,
        body: data.body,
        tagList: data.tag,
      },
    }
    dispatch(fetchGetNewArticle(isValidData))
    reset()
  }

  console.log(buttons, 'buttons')

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
              maxLength: { value: 3000, message: 'Максимум 100 символов' },
              minLength: { value: 3, message: 'Минимум 3 символа' },
            })}
          ></input>
          <div className={styles.error}>{errors?.title && <p>{errors?.title?.message || 'Error!'}</p>}</div>
        </label>
        <label className={styles.label}>
          <span className={styles.labelSpan}>Short description</span>
          <input
            className={styles.input}
            type="text"
            placeholder="Title"
            {...register('description', {
              required: 'Поле обязательно для заполнения',
              maxLength: { value: 3000, message: 'Максимум 3000 символов' },
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
              maxLength: { value: 3000, message: 'Максимум 3000 символов' },
              minLength: { value: 3, message: 'Минимум 3 символа' },
            })}
          ></input>
          <div className={styles.error}>{errors?.body && <p>{errors?.body?.message || 'Error!'}</p>}</div>
        </label>
        <span className={styles.labelSpan}>Tags</span>
        <label className={styles.wrapperTag}>
          {buttons.map((oneInput, index) => (
            <>
              <div key={index}>
                <input
                  name="service"
                  placeholder="Tag"
                  className={styles.inputTag}
                  // name="service"
                  // value={oneInput.service}
                  onChange={(e) => handleChange(e, index)}
                  {...register('tag', {
                    pattern: {
                      value: oneInput.service,
                    },
                  })}
                />
                {buttons.length > 1 && (
                  <button className={styles.wrapperBtnDel} onClick={() => handleBtnDelete(index)}>
                    Delete
                  </button>
                )}
                {/* className={styles.buttonTag}  */}
                {buttons.length - 1 === index && buttons.length < 4 && <button onClick={handleBtnAdd}>Add tag</button>}
              </div>
            </>
          ))}
        </label>
        <button className={styles.send}>Send</button>
      </form>
    </div>
  )
}
export default CreateNewPost
