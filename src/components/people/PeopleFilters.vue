<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue';
import SearchField from '../base/SearchField.vue';

import { usePeopleStore } from '@/stores/people';

const peopleStore = usePeopleStore();
</script>

<template>
  <BaseCard>
    <SearchField
      id="person-search"
      placeholder="find by name..."
      v-model="peopleStore.searchTerm"
    />
  </BaseCard>
</template>
