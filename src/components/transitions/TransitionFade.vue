<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  isOutIn: {
    type: Boolean,
    default: false,
  },
});

const mode = computed(() => {
  return props.isOutIn ? 'out-in' : 'default';
});
</script>

<template>
  <transition name="fade" :mode="mode">
    <slot></slot>
  </transition>
</template>

<style>
/* fade transtion */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
