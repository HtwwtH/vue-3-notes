import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import { uuid } from 'vue-uuid'

import type { Note } from "./interfaces/note"

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
    async getNotesList() {
      
    },

    addNewNote(newNote: string) {
      const date = dayjs()
      this.notesList.unshift({
        id: uuid.v4(),
        date,
        content: newNote
      })
    },

    deleteNote(id: string) {
      this.notesList = this.notesList.filter(note => note.id !== id)
    },

    saveEditedNote(id: string | string[], content: string) {
      console.log(id)
      console.log(content)

      const index = this.notesList.findIndex(note => note.id === id)
      console.log(index)
      this.notesList[index].content = content
    }
  },
})