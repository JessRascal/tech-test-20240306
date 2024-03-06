<script setup lang="ts">
defineProps({
  columnHeaders: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    default: 'rows',
  },
});
</script>

<template>
  <div class="border rounded overflow-hidden">
    <table class="table-auto w-full md:text-sm text-left text-medium">
      <thead class="text-medium uppercase bg-gray-200">
        <tr>
          <th v-for="(header, index) in columnHeaders" :key="index" class="px-4 py-2 font-medium">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y">
        <slot name="rows">
          <tr>
            <td :colspan="columnHeaders.length" class="px-4 py-4 text-low italic">
              No {{ label }} to display
            </td>
          </tr>
        </slot>
      </tbody>
    </table>
  </div>
</template>

<style lang="postcss" scoped>
:deep(td) {
  padding: 1rem;
  background-color: #fff;
}
</style>
