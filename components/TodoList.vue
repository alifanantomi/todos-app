<template>
  <div class="w-1/2 mx-auto flex flex-col py-6 gap-3">
    <h1 class="text-3xl font-semibold">To-Do List</h1>
    <div class="flex gap-2">
      <input class="w-full border-2 border-blue-400 p-2" v-model="newTodo" @keyup.enter="addTodo" placeholder="Add a new task" />
      <button class="bg-blue-400 text-white p-2" @click="addTodo">Tambah</button>
    </div>
    <ul>
      <li class="flex gap-2 items-center py-2 border-b-[1px] border-gray-300" v-for="(todo, index) in todos" :key="index">
        <input type="checkbox" v-model="todo.done" />
        <span :class="{ 'line-through': todo.done }">{{ todo.text }}</span>
        <button @click="removeTodo(index)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const newTodo = ref('')
const todos = ref([])

const addTodo = () => {
  if (newTodo.value.trim() !== '') {
    todos.value.push({ text: newTodo.value, done: false })
    newTodo.value = ''
  }
}

const removeTodo = (index) => {
  todos.value.splice(index, 1)
}
</script>

<style scoped>
.done {
  text-decoration: line-through;
}
</style>
