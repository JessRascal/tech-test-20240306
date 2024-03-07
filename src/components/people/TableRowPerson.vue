<script setup lang="ts">
import { type PropType, computed } from 'vue';

import type { Person } from '@/models/Person';

const props = defineProps({
  person: {
    type: Object as PropType<Person>,
    required: true,
  },
});

const activeLabel = computed(() => (props.person.active ? 'Active' : 'Inactive'));
</script>

<template>
  <tr>
    <td class="font-bold">{{ person.name }}</td>
    <td>{{ person.dateOfBirth }}</td>
    <td>{{ person.startDate }}</td>
    <td>{{ activeLabel }}</td>
  </tr>
</template>
