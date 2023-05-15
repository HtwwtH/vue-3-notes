<template>
  <div class="modal is-active p-2">
    <div class="modal-background"></div>
    <div class="modal-card" ref="modalCardRef">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete Note?</p>
        <button
          @click="closeModal"
          class="delete"
          aria-label="close"
        ></button>
      </header>
      <section class="modal-card-body">
        Are you sure you want to delete this Note?
      </section>
      <footer class="modal-card-foot">
        <button
          @click="closeModal"
          class="button">
          Cancel
        </button>
        <button
          @click="deleteNote(noteId)"
          class="button is-success"
        >
          Yes, delete
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useNotesStore } from '@/stores/notes'
import { onClickOutside } from '@vueuse/core'

defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  noteId: {
    type: String,
    required: true
  }
})

const notesStore = useNotesStore()

const modalCardRef = ref(null)

onClickOutside(modalCardRef, () => closeModal())

const deleteNote = async(noteId: string) => {
  await notesStore.deleteNote(noteId)
}

const emit = defineEmits<{
  (e: 'update:modelValue', value: Boolean): void
}>()

const closeModal = () => {
  emit('update:modelValue', false)
}

const handleEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') closeModal()
}

onMounted(() => {
  document.addEventListener('keyup', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('keyup', handleEscape)
})
</script>