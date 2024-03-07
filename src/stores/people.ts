import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import { getPeople } from './api';

// import { AppError } from '@/models/AppError';
import type { Person } from '@/models/Person';

export const usePeopleStore = defineStore('people', () => {
  const isLoading = ref<Boolean>(true);
  const people = ref<Person[]>([]);
  const sortColumn = ref('name');
  const isSortDescending = ref(false);

  const sortedPeople = computed(() => {
    return [...people.value].sort((a, b) => {
      const selectedKey = sortColumn.value;

      // make sure the sort column key exists before accessing it
      if (!(selectedKey in a) || !(selectedKey in b)) {
        return 0;
      }

      let valA = a[selectedKey as keyof Person];
      let valB = b[selectedKey as keyof Person];

      // boolean sorting
      if (typeof valA === 'boolean' && typeof valB === 'boolean') {
        if (isSortDescending.value) {
          // descending: false before true
          return valA === valB ? 0 : valA ? 1 : -1;
        } else {
          // ascending: true before false
          return valA === valB ? 0 : valA ? -1 : 1;
        }
      }

      // string sorting (case insensitive)
      if (typeof valA === 'string' && typeof valB === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      if (valA < valB) return isSortDescending.value ? 1 : -1;
      if (valA > valB) return isSortDescending.value ? -1 : 1;

      return 0;
    });
  });

  const setSortColumn = (headerKey: string) => {
    const current = sortColumn.value.toLowerCase();
    const selected = headerKey.toLowerCase();

    // already sorting by this column so invert direction
    if (current === selected) {
      isSortDescending.value = !isSortDescending.value;
    } else {
      // different column so sort ascending
      sortColumn.value = headerKey;
      isSortDescending.value = false;
    }
  };

  const populatePeople = async () => {
    try {
      isLoading.value = true;

      const peopleData = await getPeople();

      people.value = peopleData.map((person: any) => ({
        id: person.id,
        name: person.name,
        dateOfBirth: person.DateOfBirth, // note: property capitalised in JSON from endpoint
        startDate: person.StartDate, // note: property capitalised ins JSON from endpoint
        active: person.active,
      }));
    } catch (err) {
      _handleError(err);
    } finally {
      isLoading.value = false;
    }
  };

  // PRIVATE FUNCTIONS
  const _handleError = async (err: unknown) => {
    console.log(`_handleError: `, err); // TODO: REMOVE
    // if (err instanceof AppError) {
    // }
  };

  return {
    isLoading,
    sortColumn,
    isSortDescending,
    sortedPeople,
    setSortColumn,
    populatePeople,
  };
});
