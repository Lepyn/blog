import axios from 'axios'
import instance from './baseUrlService'

export const getArticlesList = async (offset = 0) => {
  const token = localStorage.getItem('token')
  const response = await instance.get('articles', {
    params: {
      limit: 5,
      offset,
    },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  if (response.statusText !== '') {
    console.log('ОШИБКА В arcticleServise')
  }

  return response.data
}

export const getFullArticle = async (slug) => {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
  const response = await instance.get(`articles/${slug}`, { headers })
  //   params: {
  //     slug: '',
  //   },
  // })

  return response.data
}

export const getNewArticle = async (isValidData) => {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
  const response = await instance.post('/articles', isValidData, { headers })
  if (response.status >= 400) {
    throw new Error('ошибка обработки данных')
  }
  return response.data
}

export const deleteOwnArticle = async (slug) => {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
  const response = await instance.delete(`/articles/${slug}`, { headers })
  if (response.status >= 400) {
    throw new Error('ошибка обработки данных')
  }
}

export const editOwnArticle = async (slugData) => {
  const token = localStorage.getItem('token')
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }
  const { slug } = slugData
  const response = await axios.put(`https://blog.kata.academy/api/articles/${slug}`, slugData, { headers })
  // console.log(response.status)

  return response.data
}

// export const sendLikeForArticle = async (slug, countLike) => {
//   const token = localStorage.getItem('token')
//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${token}`,
//   }
//   const response = await instance.post(`/articles/${slug}/favorite`, countLike, { headers })
//   return response.data
// }

// export const removeLikeForArticle = async (slug) => {
//   const token = localStorage.getItem('token')
//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${token}`,
//   }
//   const response = await instance.delete(`/articles/${slug}/favorite`, { headers })
//   return response.data
// }
