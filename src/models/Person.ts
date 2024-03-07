import type { Shift } from './Shift';

export interface Person {
  id: number;
  name: string;
  dateOfBirth: string;
  startDate: string;
  active: boolean;
  shifts?: Shift[];
}
