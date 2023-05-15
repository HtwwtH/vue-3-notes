export interface Note {
  id?: string;
  content: string;
  date: string;
}
export interface BDNote extends Note {
  __v?: number,
  _id: string;
  content: string;
  date: string;
}