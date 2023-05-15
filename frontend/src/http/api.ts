import http from '@/http'
import type { Note, BDNote } from "@/interfaces/note"

export const getNotes = async() => {
  const { data } = await http.get("notes")
  return data
}

export const postNote = async(note: Note) => {
  const { data } = await http.post("notes", note)
  return data
}

export const putNote = async(id: string | string[], note: BDNote) => {
  const { data } = await http.put(`notes/${id}`, note)
  return data
}

export const deleteNote = async(id: string | string[]) => {
  const { data } = await http.delete(`notes/${id}`)
  return data
}