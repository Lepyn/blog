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
