<template>
  <div class="notes">
    <AddEditNote
      v-model="newNote"
      placeholder="Add a new note"
      ref="addEditNoteRef"
      :is-danger="isDanger"
    >
        <template #buttons>
          <button
            class="button"
            @click="addNewNote"
            :disabled="!newNote"
          >
            Add note
          </button>
        </template>
    </AddEditNote>

    <NoteCard
      v-for="note in notesStore.notesList"
      :key="note.id"
      :note="note"
    />
  </div>
</template>

<script setup lang="ts">
import NoteCard from '@/components/Notes/NoteCard.vue'
import AddEditNote from '@/components/Notes/AddEditNote.vue'
import { useNotesStore } from '@/stores/notes'
import { ref, watch, onMounted } from 'vue'

const notesStore = useNotesStore()

onMounted(async () => {
  await notesStore.setNotesList()
})

const newNote = ref('')
const addEditNoteRef = ref<null | { focusTextArea: () => null }>(null)

const addNewNote = async () => {
  await notesStore.addNewNote(newNote.value)
  newNote.value = ''
  addEditNoteRef.value?.focusTextArea()
}

let isDanger = false

watch(newNote, (newVal, oldVal) => {
  if (newVal.length === 256) {
    isDanger = true
  }
  if (oldVal.length === 256 && newVal.length < 256) {
    isDanger = false
  }
})
</script>