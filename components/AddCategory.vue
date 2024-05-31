<script lang="ts" setup>
const newCategory = ref<string>('')
const categoryStore = useCategoryStore()

const { getCategories, addCategory } = categoryStore
const { categories } = storeToRefs(categoryStore)

const addCategoryHandler = async () => {
  if (newCategory.value.trim() !== '') {
    await addCategory(newCategory.value)
    newCategory.value = ''
  }

  await getCategories()
}

await getCategories()

const { onLogout } = useAuth()
const onClickLogout = () => {
  onLogout()
  reloadNuxtApp()
}
</script>

<template>
  <div class="w-1/2 mx-auto flex flex-col py-6 gap-3">
    <div class="flex items-end gap-4">
      <h1 class="text-3xl font-semibold">Add Category</h1>
      <NuxtLink to="/">To-Do</NuxtLink>
      <button class="bg-red-400 w-max px-4 py-1" @click="onClickLogout">Logout</button>
    </div>
    <div class="flex gap-2">
      <input type="text" v-model="newCategory" class="w-full border-2 border-blue-400 p-2" placeholder="Add Category" />
      <button class="bg-blue-400 text-white p-2" @click="addCategoryHandler">Tambah</button>
    </div>

    <ul>
      <li v-for="category of categories" class="w-full py-2 border-b-[1px] border-gray-300">
        {{ category.name }}
      </li>
    </ul>
  </div>
</template>
