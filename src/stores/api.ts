import axios from 'axios';

import { createAppError } from '@/models/AppError';

// endpoint urls
const peopleUrl = 'https://run.mocky.io/v3/0c0c684d-f6cb-4832-b5f4-16c6796f950f';
const shiftsUrl = 'https://run.mocky.io/v3/91a019a1-318a-45a9-a251-d1df1712a647';

// functions
export const getPeople = async () => {
  try {
    const res = await axios.get(peopleUrl);
    return res.data;
  } catch (err) {
    throw createAppError(err, 'people/unable-to-get');
  }
};

export const getShifts = async () => {
  try {
    const res = await axios.get(shiftsUrl);
    return res.data;
  } catch (err) {
    throw createAppError(err, 'shifts/unable-to-get');
  }
};
