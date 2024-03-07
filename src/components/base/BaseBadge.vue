<script setup lang="ts">
import { computed, type PropType } from 'vue';

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
});

const dynamicClasses = computed(() => {
  return [
    `bg-${props.variant}`,
    {
      'text-white': props.variant == UIVariant.Primary || props.variant == UIVariant.Success,
      'text-medium': props.variant == UIVariant.Default,
    },
  ];
});
</script>

<template>
  <span class="px-2 py-1 text-xs rounded" :class="dynamicClasses">
    <slot></slot>
  </span>
</template>
