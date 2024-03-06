<script setup lang="ts">
import { ref } from 'vue';

import BaseTable from '@/components/base/BaseTable.vue';
import TableRowPerson from '@/components/people/TableRowPerson.vue';

import { usePeopleStore } from '@/stores/people';

const peopleStore = usePeopleStore();

const tableHeaders = ref(['Name', 'Date of Birth', 'Start Date', 'Status']);

// populate people in state
await peopleStore.populatePeople();
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <p>Select a person to view their shifts</p>
    <BaseTable :column-headers="tableHeaders" label="people">
      <template #rows>
        <TableRowPerson v-for="person of peopleStore.people" :key="person.id" :person="person" />
      </template>
    </BaseTable>
  </div>
</template>
