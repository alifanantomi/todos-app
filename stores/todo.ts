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

  const removeTodo = (index: number) => {
    if (todos.value) {
      todos.value.splice(index, 1)
    }
  }

  return {
    todos,
    getTodos,
    addTodo,
    removeTodo
  }
})