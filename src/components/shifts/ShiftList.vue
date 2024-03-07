<script setup lang="ts">
import { computed, type PropType } from 'vue';

import ShiftListItem from '@/components/shifts/ShiftListItem.vue';

import type { Person } from '@/models/Person';

const props = defineProps({
  person: {
    type: Object as PropType<Person>,
    required: true,
  },
});

const hasShifts = computed(() => props.person.shifts?.length);
const personName = computed(() => props.person.name);
</script>

<template>
  <div class="flex flex-col gap-y-4">
      <div>
          <div class="text-bold uppercase">{{ personName }}</div>
          <div class="text-low uppercase">Shifts</div>
      </div>
      <template v-if="hasShifts">
        <ShiftListItem v-for="shift of person.shifts" :key="shift.id" :shift="shift" />
      </template>
      <div v-else class="text-low italic">No shifts to display</div>
  </div>
</template>
