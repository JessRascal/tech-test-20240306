import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

import { getPeople, getShifts } from './api';

// import { AppError } from '@/models/AppError';
import type { Person } from '@/models/Person';
import type { Shift } from '@/models/Shift';

export const usePeopleStore = defineStore('people', () => {
  const isLoading = ref<Boolean>(true);
  const people = ref<Person[]>([]);
  const sortColumn = ref('name');
  const isSortDescending = ref(false);
  const searchTerm = ref<string | undefined>(undefined);

  const sortedAndFilteredPeople = computed(() => {
    // filter first
    const filtered = _filterPeopleBySearch();

    return filtered.sort((a, b) => {
      const selectedKey = sortColumn.value;

      // make sure the sort column key exists before accessing it
      if (!(selectedKey in a) || !(selectedKey in b)) return 0;

      // note: can assert because checked it exists above
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

      if (!valA || !valB) return 0;

      if (valA < valB) return isSortDescending.value ? 1 : -1;
      if (valA > valB) return isSortDescending.value ? -1 : 1;

      return 0;
    });
  });

  const fetchPeopleAndShifts = async () => {
    try {
      isLoading.value = true;

      const [peopleData, shiftsData] = await Promise.all([_fetchPeople(), _fetchShifts()]);

      people.value = _combineShiftsWithPeople(peopleData, shiftsData);
    } catch (err) {
      _handleError(err);
    } finally {
      isLoading.value = false;
    }
  };

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

  // PRIVATE FUNCTIONS
  const _fetchPeople = async (): Promise<Person[]> => {
    try {
      const peopleData = await getPeople();

      return peopleData.map((person: any) => ({
        id: person.id,
        name: person.name,
        dateOfBirth: person.DateOfBirth, // note: property capitalised in JSON from endpoint
        startDate: person.StartDate, // note: property capitalised ins JSON from endpoint
        active: person.active,
        shifts: [],
      }));
    } catch (err) {
      _handleError(err);
      return [];
    }
  };

  const _fetchShifts = async (): Promise<Shift[]> => {
    try {
      const shiftsData = await getShifts();

      return shiftsData.map((shift: any) => ({
        // note: properties capitalised in JSON from endpoint
        id: shift.Id,
        location: shift.Location,
        role: shift.Role,
        personId: shift.PersonId,
        start: shift.Start,
        end: shift.End,
      }));
    } catch (err) {
      _handleError(err);
      return [];
    }
  };

  const _combineShiftsWithPeople = (people: Person[], shifts: Shift[]): Person[] => {
    const peopleCombined: Person[] = [...people];

    shifts.forEach((shift) => {
      const person = peopleCombined.find((person) => person.id === shift.personId);

      if (person) {
        // add the shift to the person's shift array
        person.shifts?.push(shift);
      }
    });

    return peopleCombined;
  };

  const _filterPeopleBySearch = (): Person[] => {
    // EXIT if searchTerm not populated
    if (!searchTerm.value) return people.value;

    const term = searchTerm.value.toLowerCase();

    return people.value.filter((person) => {
      const name = person.name.toLowerCase();
      return name.includes(term);
    });
  };

  const _handleError = async (err: unknown) => {
    console.log(`_handleError: `, err); // TODO: REMOVE
    // if (err instanceof AppError) {
    // TODO: display toast
    // }
  };

  return {
    isLoading,
    sortColumn,
    isSortDescending,
    searchTerm,
    sortedAndFilteredPeople,
    fetchPeopleAndShifts,
    setSortColumn,
  };
});
