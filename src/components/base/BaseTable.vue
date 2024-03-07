<script setup lang="ts">
import { type PropType } from 'vue';

import TableHeaderPerson from '@/components/people/TableHeaderPerson.vue';

import type { TableHeader } from '@/models/TableHeader';

const props = defineProps({
  label: {
    type: String,
    default: 'rows',
  },
  headers: {
    type: Array as PropType<TableHeader[]>,
    required: true,
  },
  sortColumn: {
    type: String,
    required: true,
  },
  isSortDescending: {
    type: Boolean,
    required: true,
  },
});

const isSortColumn = (headerKey: string) => props.sortColumn === headerKey;
</script>

<template>
  <div class="border rounded overflow-hidden">
    <table class="table-fixed w-full text-xs md:text-sm text-left text-medium">
      <thead class="uppercase bg-default">
        <tr>
          <TableHeaderPerson
            v-for="(header, index) in headers"
            :key="index"
            :header="header"
            :is-sort-active="isSortColumn(header.key)"
            :is-sort-descending="isSortColumn(header.key) && isSortDescending"
            @toggle-sort="$emit('toggle-sort', header.key)"
          />
        </tr>
      </thead>
      <tbody class="divide-y">
        <slot name="rows">
          <tr>
            <td :colspan="headers.length" class="px-4 py-4 text-low italic">
              No {{ label }} to display
            </td>
          </tr>
        </slot>
      </tbody>
    </table>
  </div>
</template>

<style lang="postcss" scoped>
:deep(tr:not(thead > tr)) {
  @apply bg-white hover:bg-primary-transparent;
}
:deep(td) {
  @apply px-4 py-3;
}
</style>
