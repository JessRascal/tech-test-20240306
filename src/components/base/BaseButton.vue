<script setup lang="ts">
import { type PropType, computed } from 'vue';

import { UIVariant } from '@/enums/UIEnums';

const props = defineProps({
  variant: {
    type: String as PropType<UIVariant>,
    default: UIVariant.Primary,
    validator(value: UIVariant) {
      return [
        UIVariant.Primary,
        UIVariant.Secondary,
        UIVariant.Danger,
        UIVariant.Warning,
        UIVariant.Success,
        UIVariant.Info,
        UIVariant.Default,
      ].includes(value);
    },
  },
  ariaLabel: {
    type: String,
    default: undefined,
  },
});

const dynamicClasses = computed(() => {
  return [
    `bg-${props.variant}`,
    {
      'text-white': props.variant == UIVariant.Primary,
      'text-medium': props.variant == UIVariant.Default,
    },
  ];
});
</script>

<template>
  <button type="button" class="px-4 py-2 rounded" :class="dynamicClasses" :aria-label="ariaLabel">
    <slot></slot>
  </button>
</template>
