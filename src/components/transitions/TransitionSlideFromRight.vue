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
  <transition name="slide-from-right" :mode="mode">
    <slot></slot>
  </transition>
</template>

<style>
/* slide from right transition */
.slide-from-right-enter-active,
.slide-from-right-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-from-right-enter-from,
.slide-from-right-leave-to {
  transform: translateX(100%);
}
</style>
