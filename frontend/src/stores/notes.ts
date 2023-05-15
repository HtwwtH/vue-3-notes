import { defineStore } from 'pinia'
import dayjs from 'dayjs'

import { getNotes, postNote, putNote, deleteNote } from '@/http/api'

import type { Note, BDNote } from "@/interfaces/note"

export type RootState = {
  notesList: Note[];
};

export const useNotesStore = defineStore('notes', {
  state: () => ({ 
    notesList: []
  } as RootState),

  getters: {
    getNoteContent: (state) => {
      return (id: string | string[]) => {
        return state.notesList.find(note => note.id === id)?.content || ''
      }
    },
    getNotesNumber: (state) => {
      return state.notesList.length
    },
    getSymbolsNumber: (state) => {
      return state.notesList.reduce((acc, note) => acc + note.content.length, 0)
    }
  },

  actions: {
    async setNotesList() {
      const list: BDNote[] = await getNotes()
      this.notesList = list.map(item => ({
        id: item._id,
        date: item.date,
        content: item.content
      })).sort( (x, y) => {
      if (x.date > y.date) {
        return -1;
      }
      if (y.date > x.date) {
        return 1;
      }
        return 0;
      })
    },

    async addNewNote(newNote: string) {
      const date = dayjs()
      const note = {
        date: date.format('D.M.YYYY, H:m'),
        content: newNote
      }
      const postedNote = await postNote(note)
      this.notesList.unshift(postedNote.note)
    },

    async deleteNote(id: string) {
      this.notesList = this.notesList.filter(note => note.id !== id)
      await deleteNote(id)
    },

    async saveEditedNote(id: string | string[], content: string) {
      const index = this.notesList.findIndex(note => note.id === id)
      this.notesList[index].content = content
      await putNote(id, {
        _id: id,
        content,
        date: this.notesList[index].date
      })
    }
  },
})