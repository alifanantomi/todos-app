import { defineStore } from 'pinia'

interface Todo {
  id: number
  title: string
  status: boolean
}

export const useTodoStore = defineStore('todos', () => {
  const todos: Ref<Todo[] | null> = ref([])

  const getTodos = async () => {
    const { baseUrl, apiKey, secretKey } = useAppConfig()

    const { data, error} = await useFetch<Todo[]>('rest/v1/todo', {
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

    if (error) {
      console.error(error)
      return
    }
  }

  const addTodo = async (text: string) => {
    const { baseUrl, apiKey, secretKey } = useAppConfig()

    const { data, error} = await useFetch<Todo[]>('rest/v1/todo', {
      baseURL: baseUrl,
      method: 'POST',
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${secretKey}`
      },
      body: { 
        title: text, 
        status: false
      }
    })

    if (error) {
      console.error(error)
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

    if (error) {
      console.error(error)
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