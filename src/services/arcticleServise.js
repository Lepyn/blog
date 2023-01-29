import instance from './baseUrlService'

export const getArticlesList = async (offset = 0) => {
  const response = await instance.get('articles', {
    params: {
      limit: 5,
      offset,
    },
  })

  if (response.statusText !== '') {
    console.log('ОШИБКА В arcticleServise')
  }

  return response.data
}

export const getFullArticle = async () => {
  const response = await instance.get(`articles/`, {
    params: {
      slug: '',
    },
  })
  console.log(response.data)
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
