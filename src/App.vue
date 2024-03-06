<script setup lang="ts">
import { RouterView } from 'vue-router';

import NavBar from '@/components/nav/NavBar.vue';
</script>

<template>
  <div class="min-h-dvh flex flex-col">
    <header>
      <NavBar />
    </header>
    <Suspense>
      <RouterView />
    </Suspense>
  </div>
</template>
