import type dayjs from 'dayjs'

export interface Note {
  id: string;
  content: string;
  date: dayjs.Dayjs;
}