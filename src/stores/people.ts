import { ref } from 'vue';
import { defineStore } from 'pinia';

import { getPeople } from './api';

// import { AppError } from '@/models/AppError';
import type { Person } from '@/models/Person';

export const usePeopleStore = defineStore('people', () => {
  const isLoading = ref<Boolean>(true);
  const people = ref<Person[]>([]);

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
    people,
    populatePeople,
  };
});
