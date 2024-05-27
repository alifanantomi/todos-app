<script setup lang="ts">
const props = defineProps(['todo'])
const emits = defineEmits(['remove-todo'])
</script>
<template>
  <div class="flex justify-between items-center">
    <div class="flex gap-2 items-center">
      <input type="checkbox" v-model="todo.status" />
      <span :class="{ 'line-through': todo.status }">{{ todo.title }}</span>
    </div>
    <button class="text-sm" @click="emits('remove-todo', todo.id)">Hapus</button>
  </div>
</template>