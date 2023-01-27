import styles from './CreateNewPost.module.scss'

const CreateNewPost = () => {
  return (
    <div className={styles.containerNewPost}>
      <h4> Create New Post</h4>
      <form className={styles.aboutArticle}>
        <label className={styles.label}>
          <span className={styles.labelSpan}> Title</span>
          <input className={styles.input}></input>
        </label>
        <label className={styles.label}>
          <span className={styles.labelSpan}>Short description</span>
          <input className={styles.input}></input>
        </label>
        <label className={styles.label}>
          <span className={styles.labelSpan}>Text</span>
          <input className={styles.inputText}></input>
        </label>
        <span className={styles.labelSpan}>Tags</span>
        <label className={styles.wrapperTag}>
          <input className={styles.inputTag} placeholder="Tag"></input>
          <input className={styles.inputTag} placeholder="Tag"></input>
          <button className={styles.buttonTag}>Delete</button>
          <button className={styles.buttonTag}>Delete</button>
          <button className={styles.buttonTag}>Add Tag</button>
        </label>
      </form>
      <button className={styles.send}>Send</button>
    </div>
  )
}
export default CreateNewPost
