<script setup lang="ts">
import { type PropType, computed } from 'vue';

import { formatDateTime } from '@/utils/date-time-formatter';

import BaseCard from '@/components/base/BaseCard.vue';
import BaseBadge from '@/components/base/BaseBadge.vue';

import type { Shift } from '@/models/Shift';
import { UIVariant } from '@/enums/UIEnums';

const props = defineProps({
  shift: {
    type: Object as PropType<Shift>,
    required: true,
  },
});

const startDateTime = computed(() => formatDateTime(props.shift.start));
const endDateTime = computed(() => formatDateTime(props.shift.end));

const shiftTimes = computed(() => `${startDateTime.value} - ${endDateTime.value}`);
</script>

<template>
  <BaseCard class="flex-col gap-y-1">
    <div class="text-sm font-bold mb-2">
      <BaseBadge :variant="UIVariant.Default">#{{ shift.id }}</BaseBadge>
    </div>
    <div>{{ shiftTimes }}</div>
    <div>{{ shift.role }}</div>
    <div>{{ shift.location }}</div>
  </BaseCard>
</template>
