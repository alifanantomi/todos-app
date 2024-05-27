
<script setup lang="ts">
import { ref } from 'vue'

const newTodo = ref<string>('')
const todoStore = useTodoStore()

const { getTodos, addTodo, updateTodo, removeTodo } = todoStore
const { todos } = storeToRefs(todoStore)

const addTodoHandler = async () => {
  if (newTodo.value.trim() !== '') {
    await addTodo(newTodo.value)
    newTodo.value = ''
  }

  getTodos()
}

const removeTodoHandler = async (id: number) => {
  await removeTodo(id)

  getTodos()
}

const onUpdateTodo = async (id: number, status: boolean) => {
  await updateTodo(id, status)

  getTodos()
}

await getTodos()

</script>

<template>
  <div class="w-1/2 mx-auto flex flex-col py-6 gap-3">
    <h1 class="text-3xl font-semibold">Daftar To-Do</h1>
    <div class="flex gap-2">
      <input class="w-full border-2 border-blue-400 p-2" v-model="newTodo" @keyup.enter="addTodoHandler" placeholder="Tambah tugas baru" />
      <button class="bg-blue-400 text-white p-2" @click="addTodoHandler">Tambah</button>
    </div>
    <ul>
      <li class="w-full py-2 border-b-[1px] border-gray-300" v-for="(todo, index) in todos" :key="index">
        <TodoItem :todo="todo" @remove-todo="removeTodoHandler" @update-todo="onUpdateTodo" />
      </li>
    </ul>
  </div>
</template>
