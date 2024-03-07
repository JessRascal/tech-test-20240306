<script setup lang="ts">
import { ref, computed } from 'vue';

import BaseTable from '@/components/base/BaseTable.vue';
import PaginationControls from '@/components/base/PaginationControls.vue';
import TableRowPerson from '@/components/people/TableRowPerson.vue';

import type { TableHeader } from '@/models/TableHeader';

import { usePeopleStore } from '@/stores/people';

const peopleStore = usePeopleStore();

const tableHeaders = ref<TableHeader[]>([
  { key: 'name', label: 'Name' },
  { key: 'dateOfBirth', label: 'Date of Birth' },
  { key: 'startDate', label: 'Start Date' },
  { key: 'active', label: 'Status' },
]);
const currentPage = ref(1);
const itemsPerPage = ref(10);

const totalPeople = computed(() => peopleStore.sortedAndFilteredPeople.length);

const paginatedPeople = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return peopleStore.sortedAndFilteredPeople.slice(start, end);
});

// populate people in state
await peopleStore.populatePeople();
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <div class="flex items-center justify-between">
      <p class="flex-1">Select a person to view their shifts</p>
      <PaginationControls
        v-model:currentPage="currentPage"
        :items-per-page="itemsPerPage"
        :total-items="totalPeople"
      />
    </div>

    <BaseTable
      label="people"
      :headers="tableHeaders"
      :sort-column="peopleStore.sortColumn"
      :is-sort-descending="peopleStore.isSortDescending"
      @toggle-sort="peopleStore.setSortColumn"
    >
      <template #rows>
        <TableRowPerson v-for="person of paginatedPeople" :key="person.id" :person="person" />
      </template>
    </BaseTable>

    <div class="flex justify-end">
      <PaginationControls
        v-model:currentPage="currentPage"
        :items-per-page="itemsPerPage"
        :total-items="totalPeople"
      />
    </div>
  </div>
</template>
