import { defineStore } from 'pinia'
import type { CategoryInterface } from './category'

interface Todo {
  id: number
  title: string
  status: boolean
  category: CategoryInterface | null
}

export const useTodoStore = defineStore('todos', () => {
  const todos: Ref<Todo[] | null> = ref([])

  const getTodos = async () => {
    const { baseUrl, apiKey, secretKey } = useAppConfig()

    const { data, error} = await useFetch<Todo[]>('rest/v1/todo?select=id,title,status,created_at,category(id,name)', {
      baseURL: baseUrl,
      method: 'GET',
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${secretKey}`
      }
    })

    if (data) {
      todos.value = data.value
    }

    if (error.value) {
      console.error(error.value)
      return
    }
  }

  const addTodo = async (text: string, categoryId?: number | null) => {
    const { baseUrl, apiKey, secretKey } = useAppConfig()
    const body: {[key: string]: any} = { 
      title: text, 
      status: false
    }

    if (categoryId) body['category'] = categoryId

    const { data, error} = await useFetch<Todo[]>('rest/v1/todo', {
      baseURL: baseUrl,
      method: 'POST',
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${secretKey}`
      },
      body: body
    })

    if (error.value) {
      console.error(error.value)
      return
    }

    todos.value = data.value
  }

  const updateTodo = async (id: number, status: boolean) => {
    const { baseUrl, apiKey, secretKey } = useAppConfig()

    const { data, error} = await useFetch<Todo[]>(`rest/v1/todo?id=eq.${id}`, {
      baseURL: baseUrl,
      method: 'PATCH',
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${secretKey}`
      },
      body: {
        status: status
      }
    })

    if (error) {
      console.error(error)
      return
    }

    todos.value = data.value
  }

  const removeTodo = async (id: number) => {
    const { baseUrl, apiKey, secretKey } = useAppConfig()

    const { data, error} = await useFetch<Todo[]>(`rest/v1/todo?id=eq.${id}`, {
      baseURL: baseUrl,
      method: 'DELETE',
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${secretKey}`
      }
    })

    if (error.value) {
      console.error(error.value)
      return
    }

    todos.value = data.value
  }

  return {
    todos,
    getTodos,
    addTodo,
    updateTodo,
    removeTodo
  }
})