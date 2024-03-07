<script setup lang="ts">
import { computed } from 'vue';
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  },
  totalItems: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['update:currentPage']);

// note: subtract 1 from currentPage so in line with array index
const startItem = computed(() => (props.currentPage - 1) * props.itemsPerPage + 1);

// note: returns totalItems if number of items less than itemsPerPage
const endItem = computed(() => Math.min(props.currentPage * props.itemsPerPage, props.totalItems));

const itemCountLabel = computed(() => {
  return `${startItem.value} - ${endItem.value} of ${props.totalItems}`;
});

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage));

const isPreviousDisabled = computed(() => props.currentPage <= 1);
const isNextDisabled = computed(() => props.currentPage >= totalPages.value);

const goToPrevious = () => {
  if (props.currentPage > 1) {
    emit('update:currentPage', props.currentPage - 1);
  }
};

const goToNext = () => {
  const totalPages = Math.ceil(props.totalItems / props.itemsPerPage);
  if (props.currentPage < totalPages) {
    emit('update:currentPage', props.currentPage + 1);
  }
};
</script>

<template>
  <div class="flex items-center">
    <button
      type="button"
      :disabled="isPreviousDisabled"
      @click="goToPrevious"
      class="pagination-button"
      aria-label="Go to previous page"
    >
      <RiArrowLeftSLine className="pagination-icon" />
    </button>
    <div class="text-xs">{{ itemCountLabel }}</div>
    <button
      type="button"
      :disabled="isNextDisabled"
      @click="goToNext"
      class="pagination-button"
      aria-label="Go to next page"
    >
      <RiArrowRightSLine className="pagination-icon" />
    </button>
  </div>
</template>

<style lang="postcss" scoped>
.pagination-button:disabled {
  @apply cursor-not-allowed;

  .pagination-icon {
    @apply text-disabled;
  }
}
</style>
