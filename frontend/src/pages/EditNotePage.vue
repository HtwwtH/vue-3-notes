<template>
  <div class="edit-note">
    <AddEditNote
      v-model="noteContent"
      :bg-color="'link'"
      placeholder="Edit note"
      label="Edit note"
      ref="addEditNoteRef"
    >
        <template #buttons>
          <button
            class="button is-link is-light mr-4"
            @click="$router.back()"
          >
            Cancel
          </button>
          <button
            class="button"
            @click="saveNote"
            :disabled="!noteContent"
          >
            Save note
          </button>
        </template>
    </AddEditNote>
  </div>
</template>

<script setup lang="ts">
import AddEditNote from '@/components/Notes/AddEditNote.vue'
import { useNotesStore } from '@/stores/notes'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const notesStore = useNotesStore()

const noteContent = ref('')
noteContent.value = notesStore.getNoteContent(route.params.id)

const saveNote = async () => {
  await notesStore.saveEditedNote(route.params.id, noteContent.value)
  router.push('/')
}
</script>