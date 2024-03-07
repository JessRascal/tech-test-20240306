<script setup lang="ts">
import { ref, computed } from 'vue';

import BaseTable from '@/components/base/BaseTable.vue';
import PaginationControls from '@/components/base/PaginationControls.vue';
import TableRowPerson from '@/components/people/TableRowPerson.vue';

import { usePeopleStore } from '@/stores/people';

const peopleStore = usePeopleStore();

const tableHeaders = ref(['Name', 'Date of Birth', 'Start Date', 'Status']);
const currentPage = ref(1);
const itemsPerPage = ref(10);

const totalPeople = computed(() => peopleStore.people.length);

const paginatedPeople = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return peopleStore.people.slice(start, end);
});

// populate people in state
await peopleStore.populatePeople();
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <div class="flex items-center justify-between">
      <p>Select a person to view their shifts</p>
      <PaginationControls
        v-model:currentPage="currentPage"
        :items-per-page="itemsPerPage"
        :total-items="totalPeople"
      />
    </div>

    <BaseTable :column-headers="tableHeaders" label="people">
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
