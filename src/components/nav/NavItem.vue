<script setup lang="ts">
import { RouterLink } from 'vue-router';

defineProps({
  to: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="nav-item text-lg font-medium">
    <span v-if="isDisabled" class="text-disabled cursor-not-allowed">{{ label }}</span>
    <RouterLink v-else :to="to">{{ label }}</RouterLink>
  </div>
</template>

<style lang="postcss" scoped>
.router-link-active {
  color: theme('colors.primary.DEFAULT');
}
</style>
