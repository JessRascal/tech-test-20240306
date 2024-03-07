<script setup lang="ts">
import { RouterView } from 'vue-router';

import NavBar from '@/components/nav/NavBar.vue';
import SidePanel from '@/components/base/SidePanel.vue';
</script>

<template>
  <div class="min-h-dvh flex flex-col">
    <header>
      <NavBar />
    </header>
    <Suspense>
      <RouterView />
    </Suspense>
    <SidePanel />
  </div>
</template>
