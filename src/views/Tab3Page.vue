<template>
  <div class="web-page min-h-screen bg-gray-50"><header class="web-header sticky top-0 z-40 w-full bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm">
      <nav class="web-toolbar h-16 flex items-center px-4">
        <h1 class="web-title text-lg font-bold text-gray-900">Tab 3</h1>
      </nav>
    </header>
    <main class="web-content overflow-y-auto">
      <header class="web-header sticky top-0 z-40 w-full bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm" collapse="condense">
        <nav class="web-toolbar h-16 flex items-center px-4">
          <h1 class="web-title text-lg font-bold text-gray-900" size="large">Tab 3</h1>
        </nav>
      </header>

      <ExploreContainer name="Settings" />
    </main>
  </div>
</template>

<script setup lang="ts">

import ExploreContainer from '@/components/ExploreContainer.vue';
</script>
