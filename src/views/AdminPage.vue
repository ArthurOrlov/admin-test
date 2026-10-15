<script setup lang="ts">
import { reactive } from 'vue'
import type { SiteContent } from '@/types'
import rawContent from '@/content/site.json'

const content = reactive<SiteContent>(
  JSON.parse(JSON.stringify(rawContent))
)

function addBlock() {
  content.blocks.push({
    id: `block-${Date.now()}`,
    heading: 'Новый блок',
    text: 'Текст нового блока'
  })
}

function removeBlock(index: number) {
  content.blocks.splice(index, 1)
}

function save() {
  console.log('Сохраняем:', JSON.stringify(content, null, 2))
  alert('Данные готовы к отправке. Смотри консоль.')
}
</script>

<template>
  <main class="admin">
    <header class="admin-header">
      <h1>Админка</h1>
      <RouterLink to="/">← На сайт</RouterLink>
    </header>

    <section class="field">
      <label>Заголовок сайта</label>
      <input v-model="content.title" type="text" />
    </section>

    <section class="field">
      <label>Подзаголовок</label>
      <input v-model="content.subtitle" type="text" />
    </section>

    <hr />

    <section
      v-for="(block, i) in content.blocks"
      :key="block.id"
      class="block-editor"
    >
      <div class="block-head">
        <strong>Блок {{ i + 1 }}</strong>
        <button class="danger" @click="removeBlock(i)">Удалить</button>
      </div>
      <input v-model="block.heading" type="text" placeholder="Заголовок" />
      <textarea v-model="block.text" rows="3" placeholder="Текст" />
    </section>

    <button class="add" @click="addBlock">+ Добавить блок</button>

    <div class="actions">
      <button class="save" @click="save">Сохранить</button>
    </div>
  </main>
</template>

<style scoped>
.admin {
  max-width: 720px;
  margin: 40px auto;
  padding: 0 16px;
}
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.field { margin-bottom: 16px; display: flex; flex-direction: column; gap: 6px; }
.field label { font-size: 13px; color: #666; }
input, textarea {
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font: inherit;
  width: 100%;
  box-sizing: border-box;
}
textarea { resize: vertical; }
.block-editor {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.block-head { display: flex; justify-content: space-between; align-items: center; }
button {
  cursor: pointer;
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: #f5f5f5;
  font: inherit;
}
button.danger { color: #b00020; border-color: #e0a0a0; }
button.add {
  width: 100%;
  padding: 12px;
  border: 2px dashed #bbb;
  background: transparent;
  color: #666;
  margin-bottom: 24px;
}
.actions { text-align: right; }
button.save { background: #1f6feb; color: #fff; border: none; padding: 10px 24px; }
button.save:hover { background: #1858c4; }
</style>