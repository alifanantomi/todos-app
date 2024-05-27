export interface CategoryInterface {
  id: number
  name: string
}

export const useCategoryStore = defineStore('category', () => {
  const categories: Ref<CategoryInterface[] | null> = ref([])

  const getCategories = async () => {
    const { baseUrl, apiKey, secretKey } = useAppConfig()

    const { data, error } = await useFetch<CategoryInterface[]>('rest/v1/category', {
      baseURL: baseUrl,
      method: 'GET',
      headers: {
        apiKey: apiKey,
        Authorization: `Bearer ${secretKey}`
      }
    })

    if (data) categories.value = data.value

    if (error) {
      console.error(error)
      return
    }
  }

  const addCategory = async (category: string) => {
    const { baseUrl, apiKey, secretKey } = useAppConfig()

    const { data, error } = await useFetch<CategoryInterface[]>('rest/v1/category', {
      baseURL: baseUrl,
      method: 'POST',
      headers: {
        apiKey: apiKey,
        Authorization: `Bearer ${secretKey}`
      },
      body: {
        name: category
      }
    })

    if(error) {
      console.error(error)
      return
    }

    categories.value = data.value
  }

  return {
    categories,
    getCategories,
    addCategory
  }
})
