<script setup lang="ts">
import type { SiteContent } from '@/types'
import rawContent from '@/content/site.json'

const content = rawContent as SiteContent
</script>

<template>
  <main class="page">
    <header class="hero">
      <h1>{{ content.title }}</h1>
      <p class="subtitle">{{ content.subtitle }}</p>
    </header>

    <section
      v-for="block in content.blocks"
      :key="block.id"
      class="block"
    >
      <h2>{{ block.heading }}</h2>
      <p>{{ block.text }}</p>
    </section>

    <footer class="footer">
      <RouterLink to="/admin">→ Админка</RouterLink>
    </footer>
  </main>
</template>

<style scoped>
.page {
  max-width: 820px;
  margin: 40px auto;
  padding: 0 16px;
  font-family: system-ui, sans-serif;
  color: #222;
}
.hero { text-align: center; margin-bottom: 48px; }
.hero h1 { font-size: 40px; margin: 0 0 8px; }
.subtitle { color: #888; margin: 0; }
.block {
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 16px;
  background: #fafafa;
}
.block h2 { margin: 0 0 8px; font-size: 22px; }
.block p { margin: 0; line-height: 1.6; color: #444; }
.footer { margin-top: 40px; text-align: center; }
.footer a { color: #3a7afe; text-decoration: none; }
.footer a:hover { text-decoration: underline; }
</style>