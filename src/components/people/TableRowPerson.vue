<script setup lang="ts">
import { type PropType, computed } from 'vue';

import { formatDate } from '@/utils/date-time-formatter';

import type { Person } from '@/models/Person';
import { UIVariant } from '@/enums/UIEnums';

import BaseBadge from '@/components/base/BaseBadge.vue';
import ShiftList from '@/components/shifts/ShiftList.vue';

import { useSidePanelStore } from '@/stores/side-panel';

const sidePanelStore = useSidePanelStore();

const props = defineProps({
  person: {
    type: Object as PropType<Person>,
    required: true,
  },
});

const activeLabel = computed(() => (props.person.active ? 'Active' : 'Inactive'));
const dateOfBirth = computed(() => formatDate(props.person.dateOfBirth));
const startDate = computed(() => formatDate(props.person.startDate));

const badgeVariant = computed(() => (props.person.active ? UIVariant.Success : UIVariant.Default));

const displayShifts = () => {
  sidePanelStore.openSidePanelWithComponent(ShiftList, { person: props.person });
};
</script>

<template>
  <tr @click="displayShifts">
    <td class="font-bold">{{ person.name }}</td>
    <td>{{ dateOfBirth }}</td>
    <td>{{ startDate }}</td>
    <td>
      <BaseBadge :variant="badgeVariant">{{ activeLabel }}</BaseBadge>
    </td>
  </tr>
</template>
