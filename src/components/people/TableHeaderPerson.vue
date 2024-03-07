<script setup lang="ts">
import { type PropType, computed } from 'vue';

import { RiArrowUpSLine, RiArrowDownSLine, RiCircleFill } from '@remixicon/vue';

import type { TableHeader } from '@/models/TableHeader';

const props = defineProps({
  header: {
    type: Object as PropType<TableHeader>,
    required: true,
  },
  isSortActive: {
    type: Boolean,
    required: true,
  },
  isSortDescending: {
    type: Boolean,
    required: true,
  },
});

const ascendingIconComponent = RiArrowUpSLine;
const descendingIconComponent = RiArrowDownSLine;
const disabledSortIconComponent = RiCircleFill;

const iconComponent = computed(() => {
  if (props.isSortActive) {
    return props.isSortDescending ? descendingIconComponent : ascendingIconComponent;
  }

  return disabledSortIconComponent;
});

const sortIconDynamicClasses = computed(() => {
  return {
    'text-secondary': props.isSortActive,
    'text-low': !props.isSortActive,
  };
});

const iconProps = computed(() => {
  return {
    size: props.isSortActive ? '24px' : '8px',
  };
});
</script>

<template>
  <th class="px-4 py-2 font-medium" @click="$emit('toggle-sort', header.key)">
    <span class="flex items-center gap-x-2 cursor-pointer">
      {{ header.label }}
      <component :is="iconComponent" v-bind="iconProps" :class="sortIconDynamicClasses" />
    </span>
  </th>
</template>
